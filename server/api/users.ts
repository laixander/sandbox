import { eventHandler } from 'h3'

export const users = [
  {
    "id": "5fa189ea-6898-40e4-81fd-56ae451522ab",
    "name": "Chelsie Gleichner",
    "email": "Scarlett.Hilll@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Dr.%20Buster%20Moen",
    "role": "Legacy Division Facilitator",
    "status": "Active"
  },
  {
    "id": "ab0d17d1-c1a6-4be4-8226-62e513a617bb",
    "name": "Mr. Ola Macejkovic",
    "email": "Bobby25@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Mr.%20Cordia%20Ernser",
    "role": "Principal Response Coordinator",
    "status": "Active"
  },
  {
    "id": "cd1f95c2-1635-40f4-b7da-04cc423e4f93",
    "name": "Charlotte Considine",
    "email": "Taylor9@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Georgia%20Orn",
    "role": "Forward Interactions Producer",
    "status": "Active"
  },
  {
    "id": "20bca1df-4a43-49d7-9626-62d30b5417c5",
    "name": "Kelvin Bogan Jr.",
    "email": "Rick43@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Lily%20Will",
    "role": "Legacy Applications Designer",
    "status": "Active"
  },
  {
    "id": "0ab2feca-f5f7-47e1-a828-6557d1253ab3",
    "name": "Bernard Torphy I",
    "email": "Clifton2@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Chet%20Kautzer%20V",
    "role": "District Markets Executive",
    "status": "Inactive"
  },
  {
    "id": "16e3d375-91b9-42d8-aa1e-8c541f6f216c",
    "name": "Mrs. Sheri Hessel",
    "email": "Mathew.Hane@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Nathan%20Osinski",
    "role": "Customer Factors Administrator",
    "status": "Active"
  },
  {
    "id": "805c9e65-39de-4cfa-a2c9-2cdbf8a0853b",
    "name": "Susana Grant",
    "email": "Rossie7@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Annamarie%20Herzog",
    "role": "Chief Applications Specialist",
    "status": "Active"
  },
  {
    "id": "6d2eea65-4ce6-42af-b0c4-1d8dce5e4ed0",
    "name": "Lamont Koepp",
    "email": "Abbey71@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Scot%20Skiles",
    "role": "Internal Research Developer",
    "status": "Inactive"
  },
  {
    "id": "83995884-9bde-4f27-9bf2-5f2c0ec4ce4d",
    "name": "Carlton West",
    "email": "Johnathan80@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Brant%20Cassin",
    "role": "District Operations Liaison",
    "status": "Active"
  },
  {
    "id": "c03c005e-33fd-47db-9593-a0ddca3edcb4",
    "name": "Sven Bruen",
    "email": "Beulah_Shanahan-Zulauf92@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Travis%20Boyer%20PhD",
    "role": "Global Metrics Analyst",
    "status": "Active"
  },
  {
    "id": "a959e7be-de00-445b-a61b-2338065c4a24",
    "name": "Lukas Johns",
    "email": "Jaron.Schultz95@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Andy%20Jenkins",
    "role": "Forward Accountability Analyst",
    "status": "Active"
  },
  {
    "id": "0cd13a3a-2ee9-43ac-8585-80f956268a96",
    "name": "Guadalupe Steuber I",
    "email": "Steve.Roberts50@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Mr.%20Laurianne%20Dietrich",
    "role": "Product Creative Orchestrator",
    "status": "Active"
  },
  {
    "id": "81543c76-4e41-4f04-829e-6babc6673cb4",
    "name": "Josiane Barton",
    "email": "Eileen_Mitchell@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Effie%20Robel",
    "role": "Product Solutions Facilitator",
    "status": "Active"
  },
  {
    "id": "85a243c2-07ae-4fbe-b111-7cb174a42d7d",
    "name": "Mrs. Bo Bauch-Rempel",
    "email": "Maria_Schaden71@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Alice%20Sauer%20DDS",
    "role": "Investor Functionality Engineer",
    "status": "Active"
  },
  {
    "id": "6177d7f0-dbbf-49e5-a8b1-e18351f95cf7",
    "name": "Amely Thiel I",
    "email": "Katie94@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Ibrahim%20Carroll%20I",
    "role": "Direct Intranet Officer",
    "status": "Inactive"
  },
  {
    "id": "3f31bc3d-8dc2-4a8e-9ea9-571c4a9f60a9",
    "name": "Paxton Koepp",
    "email": "Pauline.Raynor@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Garret%20Hane",
    "role": "Customer Mobility Facilitator",
    "status": "Active"
  },
  {
    "id": "2167b427-c995-4de7-9ca1-aca22cfcef77",
    "name": "Zack Crooks-VonRueden",
    "email": "Titus91@yahoo.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Darla%20Legros",
    "role": "International Solutions Agent",
    "status": "Active"
  },
  {
    "id": "4ac42c05-4ebf-4840-bd1c-7a9e1e476100",
    "name": "Jana Effertz Jr.",
    "email": "Mathew22@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Gloria%20O'Keefe",
    "role": "Legacy Tactics Agent",
    "status": "Active"
  },
  {
    "id": "e9f36ade-7351-459f-81c8-658570e3d167",
    "name": "Daisha Bailey",
    "email": "Anahi.Blanda41@hotmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Gonzalo%20Kerluke",
    "role": "International Quality Supervisor",
    "status": "Active"
  },
  {
    "id": "71ff7af1-8a30-4b47-b3f3-b6706bfc07e7",
    "name": "Carolanne Smith",
    "email": "Talon73@gmail.com",
    "avatar": "https://api.dicebear.com/10.x/thumbs/svg?seed=Tommy%20Towne%20Jr.",
    "role": "Chief Identity Consultant",
    "status": "Active"
  }
]

export default eventHandler(() => users)