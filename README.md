## Install dependencies
##### 1. Move to the appropriate directory: 
```bash
cd <YOUR_PROJECT_NAME>
```
##### 2. Install dependencies
```bash
npm install
```
##### 3. Start mock api server
```bash
npm run mock:server
```
##### 4. Start application
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
export const MOCK_API_PORT = 8010;
export const API_BASE_URL = `http://localhost:${MOCK_API_PORT}`;
```


Then run
```bash
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the build folder.

Upload the contents of build to your web server to see your work live!


## Data Document

File: **/app-constants.js**

### Detail API:
##### 1. Get all members of system:
- Method: GET
- Endpoint: /members
- Sample Response (json)
```json
[
  {
    "id": 1,
    "title": "Baby",
    "imageUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
    "orderNumber": 2,
    "appointments": [
      {
        "id": 30,
        "userFullName": "Rebekah Purdy",
        "phoneNumber": "0798 137 212",
        "option1": "Full set",
        "option2": "Get",
        "option3": "Pill others",
        "status": "ASSIGNED",
        "memberId": 1,
        "start": "2019-03-04T07:00:00"
      },
      {
        "id": 60,
        "userFullName": "Rickie Medhurst",
        "phoneNumber": "0525 896 423",
        "option1": "Full set",
        "option2": "Get",
        "option3": "Pill others",
        "status": "CONFIRMED",
        "memberId": 1,
        "start": "2019-03-03T08:30:00"
      }
    ]
  }
]
```

##### 2. Get waiting appointmemts:
- Method: GET
- Endpoint: /appointments?status=WAITING
- Sample Response (json)
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
    "status": "ASSIGNED",
    "memberId": 1,
    "start": "2019-03-04T07:00:00"
  }
]
```

##### 3. Get appointmemts by members and date:
- Method: GET
- Endpoint: /appointments?memberId=1&memberId=2&start_like=2019-03-03
- Sample Response (json)
```json
[
  {
    "id": 30,
    "userFullName": "Rebekah Purdy",
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

##### 4. Get assign appointment to member:
- Method: POST
- Endpoint: /appointments
- Body (json)
```json
{
  "memberId": 1,
  "appointmentId": 12
}
```
- Sample Response (json)
```json
{
  "result": "success",
  "message": "Assign appointment successfully!"
}
```
