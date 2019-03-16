## Install dependencies
##### 1. Move to the appropriate directory: 
```bash
cd <YOUR_PROJECT_NAME>
```
##### 2. Install dependencies
```bash
npm install
```
##### 3. Start application
```bash
npm start
```
 - Custom port by running
```bash
PORT=<your-port> npm start
```
##### 5. Open application
Starts the development server and makes your application accessible at: http://localhost:8020/

## Build application 

Update api Endpoint at
File: **/app-constants.js**
```javascript
export const API_PORT = 8010;
export const DEV_API_BASE_URL = `http://localhost:${API_PORT}`;
export const PROD_API_BASE_URL = `http://api.example.com`;
```

Then run
```bash
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the build folder.

Upload the contents of build to your web server to see your work live!


## Data Document

### 1. Get all members of system:
Config at: /app-constants.js
```javascript
export const GET_MEMBERS_API = `${API_BASE_URL}/members`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* getMembers() {
  // ...
}
```
Sample Response (json)
```json
[
  {
    "id": 1,
    "title": "Baby",
    "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
    "orderNumber": 2
  },
  {
    "id": 2,
    "title": "Keely",
    "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/lowie/128.jpg",
    "orderNumber": 1
  }
]
```

### 2. Get waiting appointmemts:
Config at: /app-constants.js
```javascript
export const GET_WAITING_APPOINTMENTS_API = `${API_BASE_URL}/appointments`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* getWaitingAppointments() {
  // ...
}
```
Sample Response (json)
```json
[
  {
    "id": 19,
    "userFullName": "Elmore Reinger",
    "phoneNumber": "0072 638 941",
    "option1": "Full set",
    "option2": "Get",
    "option3": "Pill others",
    "status": "WAITING",
    "memberId": null,
    "start": null
  },
  {
    "id": 30,
    "userFullName": "Rebekah Purdy",
    "phoneNumber": "0798 137 212",
    "option1": "Full set",
    "option2": "Get",
    "option3": "Pill others",
    "status": "WAITING",
    "memberId": 1,
    "start": "2019-03-04T07:00:00"
  }
]
```

### 3. Get appointmemts by members and date:
Config at: /app-constants.js
```javascript
export const GET_APPOINTMENTS_BY_MEMBERS_DATE_API = `${API_BASE_URL}/appointments`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* getAppointmentsByMembersAndDate() {
  // ...
}
```
Sample Response (json)
```json
[
  {
    "id": 31,
    "userFullName": "Debe David",
    "phoneNumber": "0798 137 212",
    "option1": "Full set",
    "option2": "Get",
    "option3": "Pill others",
    "status": "ASSIGNED",
    "memberId": 1,
    "start": "2019-03-04T07:00:00"
  }
]
```

### 4. Post assigning an appointment to member:
Config at: /app-constants.js
```javascript
export const POST_ASSIGN_APPOINTMENT_API = `${API_BASE_URL}/appointments/assign`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* assignAppointment() {
  // ...
}
```
Body (json)
```json
{
  "memberId": 1,
  "appointmentId": 12
}
```
Sample Response (json)
```json
{
  "result": "success",
  "message": "Assign appointment successfully!"
}
```

### 5. Post moving an appointment to another member:
Config at: /app-constants.js
```javascript
export const POST_MOVE_APPOINTMENT_API = `${API_BASE_URL}/appointments/move`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* moveAppointment() {
  // ...
}
```
Body (json)
```json
{
  "memberId": 1,
  "appointmentId": 12
}
```
Sample Response (json)
```json
{
  "result": "success",
  "message": "Move appointment successfully!"
}
```

### 6. Post putting back an appointment to waiting list:
Config at: /app-constants.js
```javascript
export const POST_PUT_BACK_APPOINTMENT_API = `${API_BASE_URL}/appointments/back`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* putBackAppointment() {
  // ...
}
```
Body (json)
```json
{
  "appointmentId": 12
}
```
Sample Response (json)
```json
{
  "result": "success",
  "message": "Move appointment successfully!"
}
```

### 7. Post cancelling an appointment:
Config at: /app-constants.js
```javascript
export const POST_CANCEL_APPOINTMENT_API = `${API_BASE_URL}/appointments/cancel`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* cancelAppointment() {
  // ...
}
```
Body (json)
```json
{
  "appointmentId": 12
}
```
Sample Response (json)
```json
{
  "result": "success",
  "message": "Cancel appointment successfully!"
}
```

### 7. Post updating status an appointment:
Config at: /app-constants.js
```javascript
export const POST_STATUS_APPOINTMENT_API = `${API_BASE_URL}/appointments/status`;
```
Handle response at: /app/containers/AppointmentPage/saga.js
```javascript
export function* updateStatusAppointment() {
  // ...
}
```
Body (json)
```json
{
  "appointmentId": 12,
  "status": "PAID"
}
```
Sample Response (json)
```json
{
  "result": "success",
  "message": "Update status appointment successfully!"
}
```
