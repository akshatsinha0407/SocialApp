import { Server } from "socket.io";
import cookie from "cookie"
import jwt from "jsonwebtoken";

const users = {} //Yeh object track karta hai ki kon sa user (MongoDB ID) kis socket ID se connected hai.


//Main Function
function setupSocket(server) { 

    const io = new Server(server, {})
    //HTTP server ko pass karke Socket.IO server banata hai.


    //Authentication Middleware
    io.use((socket, next) => {
        const cookies = socket.request.headers.cookie
        const { token } = cookie.parse(cookies || "")

        if (!token) {
            return next(new Error("Authentication error"))
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            socket.user = decoded; // Attach user info to socket
            next();

        } catch (err) {
            return next(new Error("Authentication error"))
        }

    })

    // Connection Handling
    io.on("connection", (socket) => {

        users[ socket.user._id ] = socket.id  // User ka mapping store karta hai
        console.log(users)
        //Jab koi user connect hota hai to uska user ID aur socket ID map kar deta hai.


        //Disconnect Handling
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
       //Jab user disconnect hota hai to console mein log karta hai.


        // Message Handling
        socket.on("message", (msg) => {

            const { receiver /* mongodb id */, message } = msg
            socket.to(users[ receiver ]).emit("message", message)

        })

        /*
        Summary 📋
               setupSocket: HTTP server par Socket.IO server banata hai.

               io.use: Authentication middleware hai jo JWT token se user ko verify karta hai.

               io.on("connection"): Connection successful hone par chalta hai.

               users object: Online users ki mapping maintain karta hai.

               socket.on("message"): Client se aane waale messages ko sunta hai aur unhe receiver tak pahunchata hai.
        */


        // Add more event listeners as needed
    });

}

export default setupSocket;