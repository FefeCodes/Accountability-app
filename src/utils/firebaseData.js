import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Function to get partners data
export const getPartners = async () => {
  try {
    const partnersRef = collection(db, "partners");
    const q = query(partnersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting partners:", error);
    return [];
  }
};

// Function to get user tasks from the users collection document
export const getUserTasks = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return [];
    }

    const data = userSnap.data();
    const tasks = Array.isArray(data.tasks) ? data.tasks : [];

    // Normalize task shape similar to sampleTasks and sort by createdAt desc
    const normalized = tasks.map((task, index) => ({
      id: task.id || String(index),
      title: task.title || "",
      description: task.description || "",
      category: task.category || "General",
      priority: task.priority || "medium",
      dueDate: task.dueDate || null,
      isCompleted: Boolean(task.isCompleted),
      completedAt: task.completedAt || null,
      createdAt: task.createdAt || new Date().toISOString(),
    }));

    return normalized.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (error) {
    console.error("Error getting user tasks:", error);
    return [];
  }
};

// Function to get user goals from the users collection document
export const getUserGoals = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return [];
    }

    const data = userSnap.data();
    const goals = Array.isArray(data.goals) ? data.goals : [];

    // Normalize goal shape similar to sampleGoals and only keep active ones
    const normalized = goals.map((goal, index) => {
      // Support legacy onboarding format where goals are strings
      if (typeof goal === "string") {
        return {
          id: String(index),
          title: goal,
          description: "",
          category: "General",
          targetDate: null,
          progress: 0,
          milestones: [],
          isActive: true,
          createdAt: new Date().toISOString(),
        };
      }

      return {
        id: goal.id || String(index),
        title: goal.title || "",
        description: goal.description || "",
        category: goal.category || "General",
        targetDate: goal.targetDate || null,
        progress: typeof goal.progress === "number" ? goal.progress : 0,
        milestones: Array.isArray(goal.milestones) ? goal.milestones : [],
        isActive: goal.isActive !== false,
        createdAt: goal.createdAt || new Date().toISOString(),
      };
    });

    return normalized
      .filter((g) => g.isActive)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error getting user goals:", error);
    return [];
  }
};

// Function to get dashboard statistics
export const getDashboardStats = async (userId) => {
  try {
    const [tasks, goals, allUsers, userRelationships] = await Promise.all([
      getUserTasks(userId),
      getUserGoals(userId),
      getAllUsersAsPartners(userId),
      getUserPartnerRelationships(userId),
    ]);

    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    const connectedPartners = userRelationships.connectedPartners.length;
    const totalPartners = allUsers.length;

    return {
      totalPartners,
      connectedPartners,
      totalTasks: tasks.length,
      completedTasks,
      activeGoals: goals.length,
      currentGoal: goals[0]?.title || "No active goal set",
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      totalPartners: 0,
      connectedPartners: 0,
      totalTasks: 0,
      completedTasks: 0,
      activeGoals: 0,
      currentGoal: "No active goal set",
    };
  }
};

// Function to get a specific partner by ID
export const getPartnerById = async (partnerId) => {
  try {
    const partnerRef = doc(db, "partners", partnerId);
    const partnerDoc = await getDoc(partnerRef);

    if (partnerDoc.exists()) {
      return {
        id: partnerDoc.id,
        ...partnerDoc.data(),
      };
    } else {
      throw new Error("Partner not found");
    }
  } catch (error) {
    console.error("Error getting partner:", error);
    return null;
  }
};

// Function to send a connection request
export const sendConnectionRequest = async (fromUserId, toPartnerId) => {
  try {
    const partnerRef = doc(db, "partners", toPartnerId);
    const partnerDoc = await getDoc(partnerRef);

    if (!partnerDoc.exists()) {
      throw new Error("Partner not found");
    }

    const partnerData = partnerDoc.data();
    const connectionRequest = {
      fromUserId,
      toPartnerId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Add to partner's connection requests
    const updatedRequests = [
      ...(partnerData.connectionRequests || []),
      connectionRequest,
    ];

    await setDoc(
      partnerRef,
      {
        connectionRequests: updatedRequests,
      },
      { merge: true }
    );

    // Also add to user's sent requests
    const userRef = doc(db, "users", fromUserId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const sentRequests = [
      ...(userData.sentConnectionRequests || []),
      connectionRequest,
    ];

    await setDoc(
      userRef,
      {
        sentConnectionRequests: sentRequests,
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error sending connection request:", error);
    return false;
  }
};

// Function to accept a connection request
export const acceptConnectionRequest = async (userId, requestId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // Find and update the request
    const connectionRequests = userData.connectionRequests || [];
    const requestIndex = connectionRequests.findIndex(
      (req) => req.id === requestId
    );

    if (requestIndex === -1) {
      throw new Error("Connection request not found");
    }

    const request = connectionRequests[requestIndex];
    request.status = "accepted";
    request.acceptedAt = new Date().toISOString();

    // Update user's connection requests
    connectionRequests[requestIndex] = request;
    await setDoc(
      userRef,
      {
        connectionRequests,
      },
      { merge: true }
    );

    // Update partner's connection status
    const partnerRef = doc(db, "partners", request.fromPartnerId);
    await setDoc(
      partnerRef,
      {
        isConnected: true,
        connectedUserId: userId,
        connectedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error accepting connection request:", error);
    return false;
  }
};

// Function to get user's connection requests
export const getUserConnectionRequests = async (userId) => {
  try {
    const partnersRef = collection(db, "partners");
    const q = query(
      partnersRef,
      where("toUserId", "==", userId),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting connection requests:", error);
    return [];
  }
};

// Function to get user's connected partners
export const getUserConnectedPartners = async (userId) => {
  try {
    const partnersRef = collection(db, "partners");

    // Get partners where user is the sender and status is accepted
    const sentQuery = query(
      partnersRef,
      where("fromUserId", "==", userId),
      where("status", "==", "accepted")
    );
    const sentSnapshot = await getDocs(sentQuery);
    const sentPartners = sentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get partners where user is the recipient and status is accepted
    const receivedQuery = query(
      partnersRef,
      where("toUserId", "==", userId),
      where("status", "==", "accepted")
    );
    const receivedSnapshot = await getDocs(receivedQuery);
    const receivedPartners = receivedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return [...sentPartners, ...receivedPartners];
  } catch (error) {
    console.error("Error getting connected partners:", error);
    return [];
  }
};

// Function to get all users as potential partners (excluding current user)
export const getAllUsersAsPartners = async (currentUserId) => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);

    // Filter out current user in memory to avoid complex queries
    const allUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allUsers.filter((user) => user.uid !== currentUserId);
  } catch (error) {
    console.error("Error getting users as partners:", error);
    return [];
  }
};

// Function to get user's partner relationships from partners collection
export const getUserPartnerRelationships = async (userId) => {
  try {
    // Get sent connection requests
    const sentRequestsRef = collection(db, "partners");
    const sentQuery = query(
      sentRequestsRef,
      where("fromUserId", "==", userId),
      where("status", "==", "pending")
    );
    const sentSnapshot = await getDocs(sentQuery);
    const sentRequests = sentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get received connection requests
    const receivedQuery = query(
      sentRequestsRef,
      where("toUserId", "==", userId),
      where("status", "==", "pending")
    );
    const receivedSnapshot = await getDocs(receivedQuery);
    const receivedRequests = receivedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get connected partners
    const connectedQuery = query(
      sentRequestsRef,
      where("fromUserId", "==", userId),
      where("status", "==", "accepted")
    );
    const connectedSnapshot = await getDocs(connectedQuery);
    const connectedPartners = connectedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Also get partners where user is the recipient
    const connectedAsRecipientQuery = query(
      sentRequestsRef,
      where("toUserId", "==", userId),
      where("status", "==", "accepted")
    );
    const connectedAsRecipientSnapshot = await getDocs(
      connectedAsRecipientQuery
    );
    const connectedAsRecipient = connectedAsRecipientSnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    return {
      connectedPartners: [...connectedPartners, ...connectedAsRecipient],
      sentRequests,
      receivedRequests,
    };
  } catch (error) {
    console.error("Error getting user partner relationships:", error);
    return {
      connectedPartners: [],
      sentRequests: [],
      receivedRequests: [],
    };
  }
};

// Function to send connection request to another user
export const sendUserConnectionRequest = async (fromUserId, toUserId) => {
  try {
    // Check if request already exists
    const partnersRef = collection(db, "partners");
    const existingQuery = query(
      partnersRef,
      where("fromUserId", "==", fromUserId),
      where("toUserId", "==", toUserId)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      throw new Error("Connection request already exists");
    }

    // Create connection request in partners collection
    const connectionRequest = {
      fromUserId,
      toUserId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await addDoc(partnersRef, connectionRequest);

    return true;
  } catch (error) {
    console.error("Error sending user connection request:", error);
    return false;
  }
};

// Function to accept a user connection request
export const acceptUserConnectionRequest = async (userId, requestId) => {
  try {
    // Update the connection request status in partners collection
    const partnerRef = doc(db, "partners", requestId);
    const partnerDoc = await getDoc(partnerRef);

    if (!partnerDoc.exists()) {
      throw new Error("Connection request not found");
    }

    const requestData = partnerDoc.data();

    // Verify this request is for the current user
    if (requestData.toUserId !== userId) {
      throw new Error("Unauthorized to accept this request");
    }

    // Update the request status
    await setDoc(
      partnerRef,
      {
        status: "accepted",
        acceptedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error accepting user connection request:", error);
    return false;
  }
};

// Function to seed sample connection data for testing
export const seedConnectionData = async (currentUserId) => {
  try {
    console.log("Seeding connection data...");

    // Get all users except current user
    const allUsers = await getAllUsersAsPartners(currentUserId);

    if (allUsers.length === 0) {
      console.log("No other users found to create connections with");
      return;
    }

    const partnersRef = collection(db, "partners");

    // Create some sample connections
    const sampleConnections = [
      {
        fromUserId: currentUserId,
        toUserId: allUsers[0]?.uid,
        status: "accepted",
        createdAt: new Date().toISOString(),
        acceptedAt: new Date().toISOString(),
      },
    ];

    // Only create if we have users and no existing connections
    if (allUsers.length > 0) {
      const existingQuery = query(
        partnersRef,
        where("fromUserId", "==", currentUserId)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        for (const connection of sampleConnections) {
          if (connection.toUserId) {
            await addDoc(partnersRef, connection);
            console.log(
              `✅ Created connection with user ${connection.toUserId}`
            );
          }
        }
      } else {
        console.log("Connection data already exists");
      }
    }

    return true;
  } catch (error) {
    console.error("Error seeding connection data:", error);
    return false;
  }
};
