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

// Sample partners data with contact information
export const samplePartners = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Fitness enthusiast and productivity coach. Let's achieve our goals together!",
    interests: ["Fitness", "Productivity", "Health"],
    goals: ["Run a marathon", "Read 50 books this year"],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      instagram: "@sarahfitness",
    },
    isConnected: false,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
  {
    name: "Michael Chen",
    email: "michael.chen@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Software developer passionate about learning new technologies and building amazing products.",
    interests: ["Technology", "Programming", "Learning"],
    goals: ["Learn React Native", "Build a mobile app"],
    contactInfo: {
      phone: "+1 (555) 234-5678",
      email: "michael.chen@email.com",
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen",
    },
    isConnected: false,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Artist and creative writer. Looking for accountability partners for creative projects!",
    interests: ["Art", "Writing", "Creativity"],
    goals: ["Complete a novel", "Hold an art exhibition"],
    contactInfo: {
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@email.com",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      instagram: "@emilycreates",
    },
    isConnected: true,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
  {
    name: "David Kim",
    email: "david.kim@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Entrepreneur and business coach. Let's build successful businesses together!",
    interests: ["Business", "Entrepreneurship", "Networking"],
    goals: ["Launch a startup", "Build a network of 1000+ connections"],
    contactInfo: {
      phone: "+1 (555) 456-7890",
      email: "david.kim@email.com",
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "@davidkim_biz",
    },
    isConnected: true,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Yoga instructor and wellness advocate. Focused on mental and physical health.",
    interests: ["Yoga", "Wellness", "Meditation"],
    goals: ["Complete yoga teacher training", "Meditate daily for a year"],
    contactInfo: {
      phone: "+1 (555) 567-8901",
      email: "lisa.thompson@email.com",
      linkedin: "https://linkedin.com/in/lisathompson",
      instagram: "@lisayoga",
    },
    isConnected: false,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
  {
    name: "James Wilson",
    email: "james.wilson@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Photographer and travel blogger. Always looking for new adventures and stories to tell.",
    interests: ["Photography", "Travel", "Storytelling"],
    goals: ["Visit 30 countries", "Publish a photography book"],
    contactInfo: {
      phone: "+1 (555) 678-9012",
      email: "james.wilson@email.com",
      linkedin: "https://linkedin.com/in/jameswilson",
      instagram: "@jameswtravels",
    },
    isConnected: true,
    connectionRequests: [],
    createdAt: new Date().toISOString(),
  },
];

export const sampleTasks = [
  {
    title: "Complete morning workout",
    description: "30-minute cardio and strength training",
    category: "Fitness",
    priority: "high",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    title: "Read 30 pages of current book",
    description: "Continue reading 'Atomic Habits' by James Clear",
    category: "Learning",
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    title: "Update project documentation",
    description: "Document the new API endpoints and update README",
    category: "Work",
    priority: "high",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    isCompleted: true,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    title: "Plan weekend activities",
    description: "Research and plan fun activities for the weekend",
    category: "Personal",
    priority: "low",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    title: "Call family members",
    description: "Check in with parents and siblings",
    category: "Personal",
    priority: "medium",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    isCompleted: true,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const sampleGoals = [
  {
    title: "Learn React Native",
    description: "Master React Native development to build mobile apps",
    category: "Learning",
    targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months
    progress: 25,
    milestones: [
      { title: "Complete React Native basics", completed: true },
      { title: "Build first mobile app", completed: false },
      { title: "Publish app to app store", completed: false },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    title: "Run a Marathon",
    description: "Complete a full marathon within 6 months",
    category: "Fitness",
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
    progress: 15,
    milestones: [
      { title: "Run 5K without stopping", completed: true },
      { title: "Run 10K", completed: false },
      { title: "Run half marathon", completed: false },
      { title: "Complete full marathon", completed: false },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// Function to seed partners data
export const seedPartnersData = async () => {
  try {
    const partnersRef = collection(db, "partners");

    // Check if data already exists
    const existingPartners = await getDocs(partnersRef);
    if (!existingPartners.empty) {
      return;
    }

    // Add sample partners
    for (const partner of samplePartners) {
      await addDoc(partnersRef, partner);
    }
  } catch (error) {
    console.error("Error seeding partners data:", error);
  }
};

// Function to seed user-specific data
export const seedUserData = async (userId) => {
  try {
    // Seed tasks
    const tasksRef = collection(db, "users", userId, "tasks");
    const existingTasks = await getDocs(tasksRef);

    if (existingTasks.empty) {
      for (const task of sampleTasks) {
        await addDoc(tasksRef, task);
      }
    }

    // Seed goals
    const goalsRef = collection(db, "users", userId, "goals");
    const existingGoals = await getDocs(goalsRef);

    if (existingGoals.empty) {
      for (const goal of sampleGoals) {
        await addDoc(goalsRef, goal);
      }
    }

    // Update user profile with current goal
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        currentGoal: sampleGoals[0].title,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error seeding user data:", error);
  }
};

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

// Function to get user tasks
export const getUserTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user tasks:", error);
    return [];
  }
};

// Function to get user goals
export const getUserGoals = async (userId) => {
  try {
    const goalsRef = collection(db, "users", userId, "goals");
    const q = query(goalsRef, where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    // Sort in memory to avoid composite index requirement
    const goals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return goals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
