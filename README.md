# Assignment

This is an repository which manage frontend and backend

Steps to follow to run the project

\*Setup Backend first
1.Open Terminal
2.cd backend
3.npm i #install the node packages
4.npm run dev # start the project
5.You can see server is running at localhost:5000

\*Setup Frontend next
1.Open new Terminal
2.cd frontend
3.npm i #install the node packages
4.npm run start # start the project
5.You can see server is running at localhost:3000 #Anyhost no problem

But need to take care the port of backend,because it was serving data
in any case the port will change do the following steps

--In frontend/src/templates/dashboard/dashboard
you will find an link `http://localhost:5000/api/inventory?make=${filter.make}&duration=${filter.duration}` at line 21 simply change port number at there so that we can access data

I will share by deployed link of these project by doing some things worked out

Deployed link:
