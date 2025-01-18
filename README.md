## Game Logo

<img src="https://github.com/sk-yates/Write-Away-Hail-Mary/blob/main/writeawayapp.png?raw=true" width="500">

# Write Away Email App - MERN Stack CRUD App Project

## **Description**

<p>This project is a web-based email application designed to simplify email usage for users unfamiliar with traditional email systems. It demonstrates proficiency in the MERN stack (MongoDB, Express, React, and Node.js) by implementing core CRUD functionalities tailored for three user roles: Admin, Teacher, and Student. The app focuses on creating, sending, and managing emails while facilitating role-based access control and interaction.</p>

## **Github Repo**

<p><a href="https://github.com/sk-yates/Write-Away_Email-App">MERN Stack CRUD App GitHub Repository</a></p>


## **Timeframe & Working Team**

- **Timeframe**: 2 weeks
- **Team**: Collaborative project with Stephen, Tom, & Ece contributing to both frontend and backend development.

## **Technologies Used**

- **Back End**: Node.js, Express, MongoDB
- **Front End**: React.js, CSS, JavaScript
- **Tools**: Git, GitHub, MongoDB Atlas, Postman

## **Brief**

- Admins to create and delete teacher and student accounts.
- Teachers to send emails to students and manage responses.
- Students to send emails to teachers and access their Inbox, Drafts, and Sent folders.
- All users to log in, compose, reply, and interact with emails in a user-friendly interface.
- Differentiated features and functionality based on user roles.

## **Planning**

- Initial wireframes mapped out pages like Landing, Login, Inbox, and Admin/Teacher/Student dashboards.
- ER diagrams used to design MongoDB schemas, including users and emails with hierarchical role-based relationships.
- Defined user stories and workflows for each role to ensure clarity in app features.
- [Project planning material](https://trello.com/b/4guhYUob/writeaway-e-mail-app)

## **Build/Code Process**

Backend Development:

1. **Database Design**: Created schemas for Users (Admin, Teacher, Student) and Emails with features like sender, recipients, and replies and established role-based access control in the MongoDB database.

2. **Server Setup**: Built a Node.js + Express backend with RESTful APIs and built a Node.js + Express backend with RESTful APIs.

3. **Role-Based Logic**: Students send emails to teachers, while teachers can send and reply to students' emails and admins are restricted from using email features but can manage users.

4. **Authentication**: Secured endpoints with JWT-based user authentication and middleware for role verification.

Front-end Development:

1. **Dynamic UI with React.js**: Developed reusable components for the Inbox, Drafts, and Sent folders and included a Compose button and email viewer for teachers and students.

2. **State Management**: Used useState and useContext hooks for user authentication and email interactions and mock emails used to simulate the Inbox experience during development.

3. **Error Handling & Validation**: Ensured smooth form submissions with error messages for invalid inputs and missing fields.

## **Challenges**

- Implementing robust role-based access logic in both frontend and backend.
- Synchronizing email visibility in Inbox, Drafts, and Sent folders across different roles.
- Managing the interaction of real-time email data with mock emails for initial testing.

## **Wins**

- Fully functional CRUD operations for emails, including replies and role-specific routing.
- Clean and intuitive UI for users with varied roles and permissions.
- Achieved seamless integration of authentication and authorization logic for secure access.

## **Key Learnings/Takeaways**

- Strengthened understanding of MERN stack development, especially in managing complex role-based workflows.
- Enhanced skills in designing scalable and secure backend systems with Express and MongoDB.
- Learned efficient state management techniques in React and their integration with backend APIs.

## **Future Improvements**

- View All Users: Enable admins to view a list of all registered users with their roles and activity status
- Dashboard Management: Provide admins with tools to customize and manage user dashboards based on role-specific requirements.
- Delete User Account: Allow admins to delete user accounts directly from the admin panel with a confirmation prompt.
- As a Teacher, Grade a Student's Reply: Implement a feature for teachers to assign grades or feedback to student email replies.