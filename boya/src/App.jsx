import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Register from "./components/Register";
import ChatPage from "./components/ChatPage";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [mainUser, setMainUser] = useState(null);
  const [msgCount, setMsgCount] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setMainUser(localStorage.getItem("username"));
    }
  }, []);
  const [users, setUsers] = useState({
    boya: {
      friends: {
        avi: {
          readed: [],
          unreaded: [],
          lastMessage: {
            content: "",
            sendByUsername: true,
            time: "",
          },
        },
      },

      attr: {
        password: "123",
        img: "facivon-logo.png",
        name: "BOYA bot",
      },
      currentChat: null,
    },
    avi: {
      friends: {
        boya: {
          readed: [
            {
              content: "msg",
              sendByUsername: true,
              time: "datetime",
            },
          ],
          unreaded: [
            {
              content: "changeMessag",
              sendByUsername: true,
              time: "datetime",
            },
            {
              content: "changeMessagsdfsdfds",
              sendByUsername: true,
              time: "datetime",
            },
          ],
          lastMessage: {
            content: "changeMessagsdfsdfds",
            sendByUsername: true,
            time: "datetime",
          },
        },
      },

      attr: {
        password: "123",
        img: "avi.jpeg",
        name: "avish",
      },
      currentChat: null,
    },
  });
  function sendMessage(from, to, message, time) {
    const tempUsers = users;
    tempUsers[from].friends[to].readed.push({
      content: message,
      sendByUsername: true,
      time: time,
    });
    tempUsers[from].friends[to].lastMessage = {
      content: message,
      sendByUsername: true,
      time: time,
    };
    tempUsers[to].friends[from].unreaded.push({
      content: message,
      sendByUsername: false,
      time: time,
    });
    tempUsers[to].friends[from].lastMessage = {
      content: message,
      sendByUsername: false,
      time: time,
    };
    setUsers(tempUsers);
    setMsgCount(msgCount + 1);
  }
  function updateMainUser(newUser) {
    setMainUser(newUser);
  }
  function updateUsers(newUsers) {
    setUsers(newUsers);
    setMsgCount(msgCount + 1);
  }

  async function addUser(username, password, name, pic) {
    const data = {
      username: username,
      password: password,
      displayName: name,
      profilePic: pic,
    };

    const res = await fetch(process.env.REACT_APP_API_URL + "/api/Users", {
      method: "post", // send a post request
      headers: {
        "Content-Type": "application/json", // the data (username/password) is in the form of a JSON object
      },
      body: JSON.stringify(data), // The actual data (username/password)
    });
    if (res.status === 400) {
      alert("Username already exists");
      return 0;
    }
    if (res.status === 413) {
      alert("File too big");
      return 0;
    }

    return 1;
  }

  function changeCurrentUser(newUser) {
    const tempUsers = users;
    tempUsers[mainUser].currentChat = newUser;
    const tempList = [
      ...tempUsers[mainUser].friends[newUser].readed,
      ...tempUsers[mainUser].friends[newUser].unreaded,
    ];
    tempUsers[mainUser].friends[newUser].readed = tempList;
    tempUsers[mainUser].friends[newUser].unreaded = [];
    setUsers(tempUsers);
    setMsgCount(msgCount + 1);
  }
  const queryClient = new QueryClient();
  const ProtectedRoute = ({ authenticated, redirectPath = "/", children }) => {
    if (!authenticated) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };
  const UnProtectedRoute = ({
    authenticated,
    redirectPath = "/chat",
    children,
  }) => {
    if (authenticated) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };
  const routes = [
    { exact: true, path: "/", element: <Navigate to="/login" /> },
    {
      exact: true,
      path: "/login",
      element: (
        <UnProtectedRoute authenticated={mainUser}>
          <Login
            updateMainUser={updateMainUser}
            users={users}
            mainUser={mainUser}
          />
        </UnProtectedRoute>
      ),
    },
    {
      exact: true,
      path: "/chat",
      element: (
        <ProtectedRoute authenticated={mainUser} redirectPath="/login">
          <ChatPage
            // sendMessage={sendMessage}
            // updateUsers={updateUsers}
            mainUser={mainUser}
            // users={users}
            updateMainUser={updateMainUser}
            // changeCurrentUser={changeCurrentUser}
          />
        </ProtectedRoute>
      ),
    },
    {
      exact: true,
      path: "/register",
      element: (
        <UnProtectedRoute authenticated={mainUser}>
          <Register addUser={addUser} />
        </UnProtectedRoute>
      ),
    },
  ];
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
