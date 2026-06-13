import { eventHandler } from 'h3'

export const notifications = [
  {
    "id": "51f8dff2-7628-4ea3-968a-e9b38c00c8b1",
    "templateId": "system_alert",
    "payload": {
      "message": "Try to program the RSS matrix, maybe it will quantify the online hard drive!"
    },
    "type": "info",
    "isRead": false,
    "createdAt": "2026-06-11T14:43:46.612Z",
    "module": "System"
  },
  {
    "id": "ea2b3cd6-bbe0-43ba-b167-349804ae38fd",
    "templateId": "storage_warning",
    "payload": {
      "usage": 99
    },
    "type": "warning",
    "isRead": false,
    "createdAt": "2026-06-11T14:13:03.164Z",
    "module": "System"
  },
  {
    "id": "4095086a-356c-4d7f-b678-b41571c8d723",
    "templateId": "failed_login",
    "payload": {
      "email": "Monty37@gmail.com"
    },
    "type": "error",
    "isRead": false,
    "createdAt": "2026-06-10T19:50:37.758Z",
    "module": "Auth"
  },
  {
    "id": "18a152ef-8e7c-49d8-89f6-a17b17364106",
    "templateId": "export_complete",
    "payload": {
      "exportType": "System Config"
    },
    "type": "success",
    "isRead": true,
    "createdAt": "2026-06-10T17:06:05.630Z",
    "module": "CRUD"
  },
  {
    "id": "c6499430-572d-4f39-8eb5-e2564d5f4a31",
    "templateId": "failed_login",
    "payload": {
      "email": "Margaret53@gmail.com"
    },
    "type": "error",
    "isRead": true,
    "createdAt": "2026-06-09T21:38:26.931Z",
    "module": "Auth"
  },
  {
    "id": "43cc4226-c6e7-4b69-bb8e-9a9a928efe94",
    "templateId": "export_complete",
    "payload": {
      "exportType": "System Config"
    },
    "type": "success",
    "isRead": true,
    "createdAt": "2026-06-09T11:47:48.717Z",
    "module": "CRUD"
  },
  {
    "id": "4f0414e1-7e69-4ca6-917c-d937563c9887",
    "templateId": "system_alert",
    "payload": {
      "message": "Try to index the VGA capacitor, maybe it will program the cross-platform card!"
    },
    "type": "info",
    "isRead": true,
    "createdAt": "2026-06-09T03:03:27.261Z",
    "module": "System"
  },
  {
    "id": "b388a19b-2519-4589-abd2-349f7d40222e",
    "templateId": "log_cleared",
    "payload": {
      "adminName": "Oceane Dickens"
    },
    "type": "info",
    "isRead": false,
    "createdAt": "2026-06-09T01:17:08.737Z",
    "module": "Activity Logs"
  },
  {
    "id": "3019c319-8029-47eb-824c-354daea0b1d5",
    "templateId": "export_complete",
    "payload": {
      "exportType": "User Data"
    },
    "type": "success",
    "isRead": true,
    "createdAt": "2026-06-08T18:27:58.668Z",
    "module": "CRUD"
  },
  {
    "id": "af17b265-1f81-4835-bfcf-1da10f74f933",
    "templateId": "export_complete",
    "payload": {
      "exportType": "Activity Logs"
    },
    "type": "success",
    "isRead": false,
    "createdAt": "2026-06-08T10:38:41.110Z",
    "module": "CRUD"
  },
  {
    "id": "d458ef66-8a85-47a7-9f10-f1c9d8c44f8b",
    "templateId": "log_cleared",
    "payload": {
      "adminName": "Gerhard Satterfield"
    },
    "type": "info",
    "isRead": true,
    "createdAt": "2026-06-07T10:39:47.183Z",
    "module": "Activity Logs"
  },
  {
    "id": "e9bd19ae-c33a-4d93-b6df-c232e20a3037",
    "templateId": "storage_warning",
    "payload": {
      "usage": 86
    },
    "type": "warning",
    "isRead": true,
    "createdAt": "2026-06-07T10:08:04.912Z",
    "module": "System"
  },
  {
    "id": "e569cc9a-8074-4681-ad3e-73af0f1c7e69",
    "templateId": "export_complete",
    "payload": {
      "exportType": "System Config"
    },
    "type": "success",
    "isRead": false,
    "createdAt": "2026-06-06T22:26:23.802Z",
    "module": "CRUD"
  },
  {
    "id": "88305319-541d-465f-90e1-80f7e613a5e2",
    "templateId": "storage_warning",
    "payload": {
      "usage": 90
    },
    "type": "warning",
    "isRead": true,
    "createdAt": "2026-06-06T22:08:25.847Z",
    "module": "System"
  },
  {
    "id": "1474d39a-752d-4cb7-a2ab-c1904c9bfb37",
    "templateId": "system_alert",
    "payload": {
      "message": "Try to compress the COM protocol, maybe it will quantify the open-source array!"
    },
    "type": "info",
    "isRead": false,
    "createdAt": "2026-06-06T12:43:47.864Z",
    "module": "System"
  }
]

export default eventHandler(() => notifications)