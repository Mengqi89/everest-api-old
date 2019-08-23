# Everest Api


> Everest is an application for a client (Everest International Education) to handle applicants for teaching at schools in China. It has three types of main users, applicants/teachers, job posters/schools, and company/admins.

---

[Live link to Everest International Education](https://everest.everest.now.sh/)

[Api Link](https://stormy-anchorage-71465.herokuapp.com/api)

### Api
```
├── /auth
│   └── POST
│       ├── /login/schools
|       ├── /login/admins
|       ├── /login/teachers
├── /admins
│   └── GET /
│       ├── /admin/:id
│       └── /admin
│   └── POST
│        └── /
│   └── PATCH
|        └── /admin/:id
│   └── DELETE
|       └── /admin/:id
├── /schools
│   └── GET
│       ├── /
│       ├── /school
│       └── /school/:school_id
│   └── POST
│       └── /
│   └── PATCH
│       └── /school/:school_id
│   └── DELETE
|       └── /school/:school_id
├── /teachers
│   └── GET
│       └── /
│       └── /teacher
│       └── /teacher/:teacherId
│   └── POST
│       └── /
│   └── PATCH
│       └── /teacher/:teacherId
│   └── DELETE
│       └── /:teacherId
├── /aplications
│   └── GET
│       └── /:applicationId
│   └── POST
│       └── /
│   └── PATCH
│       └── /:applicationId
│   └── DELETE
│       └── /:applicationId
├── /jobs
│   └── GET
│       ├── /
│       └── /:job_id
│   └── POST
│       └── /
│   └── PATCH
│       └── /:jobId
│   └── DELETE
|       └── /:jobId

```

## Team

- **[Mengqi Wang](https://github.com/Mengqi89)** - Project Manager, Developer
- **[Kyler Renneker](https://github.com/kylerRenneker)** - QA Lead, Developer
- **[Samantha Ambroise](https://github.com/sam-ilki)** - Program Manager, Developer
- **[Natalie Sun](https://github.com/nataliesun)** - Design Lead, Developer
---

[Everest Client](https://github.com/Mengqi89/everest-client)
