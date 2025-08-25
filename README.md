# Population Growth Simulator Project
You’ll end up with:
- a tiny Express backend (serves a static page + an API /api/simulate),
- a small frontend that sends simulation parameters and draws a simple chart,
- a CLI simulation script you can run from Terminal,
- a ready-to-push Git repo. <br>

Run locally:
1. `node server.js`
2. open `http://localhost:3000`

CLI:
`node simulate.js logistic 100 0.1 1000 30`

<img width="695" height="876" alt="Screen Shot 2025-08-24 at 5 40 29 PM" src="https://github.com/user-attachments/assets/5a559fd0-2ae5-4bf6-874e-6d1e85a54ed8" />

## 1-Create project folder & initialize git + npm
Open Terminal and run:
- mkdir ~/PopulationGrowthProject
- cd ~/PopulationGrowthProject
- git init
- npm init -y <br>

<b>You now have a package.json

## 2-Install Express (Node 14 compatible)
Install Express 4 (it works with Node 14 and should be used if you need to avoid modern packages that require Node 16+):
- npm install express@4

## 3-Create project files
You'll want to create the following file structrure (relative to ~/PopulationGrowthProject):
<img width="225" height="216" alt="Screen Shot 2025-08-24 at 7 39 12 PM" src="https://github.com/user-attachments/assets/a23b69b3-7068-4dcb-8608-475a87afbbe5" />

- server.js (Express backend, simulation API)
- simulate.js (CLI simulation — run in Terminal)
- public/index.html (frontend UI)
- public/app.js (frontend logic + simple canvas plot)
- public/style.css (simple styles)
- Create .gitignore in project root:
<img width="129" height="125" alt="Screen Shot 2025-08-24 at 8 04 12 PM" src="https://github.com/user-attachments/assets/e32ad97c-49f0-4273-b3e5-addf495935ab" />

## 4-Start the server & test locally
In Terminal (project root):
- node server.js <br>
You should see Server listening: http://localhost:3000. 

Open a browser and go to http://localhost:3000. The UI should load, run a default simulation, show a chart and a small table. Try switching to Logistic and adjust parameters.

You can also run CLI simulation:
<img width="410" height="135" alt="Screen Shot 2025-08-24 at 8 07 41 PM" src="https://github.com/user-attachments/assets/fc61ff73-cd0f-4922-b599-e5e104552377" />

## 5-Commit and push to GitHub
