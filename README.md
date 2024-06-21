## UpTask Backend

---

### Kick Start

#### Commands:

`npm init --y `

create package.json

`npm i express`

Install Express

npm i -D @types/express

Install Nodemon to restar server on changes

`npm i -D nodemon`

Nodemon to use with typescript

`npm i ts-node`

Install typescript

`npm i typescript`

Create folder SRC and index.ts & server.ts inside

Create file tsconfig.json with this data.

```

{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "lib": [
      "esnext"
    ],
    "target": "ESNext",
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "strict": false,
    "sourceMap": true,
    "esModuleInterop": true,
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

```

In server.ts

```
import express from "express"

const app = express()

export default app

```

In index.ts connect to server

```
import server from "./server"

const port = process.env.Port || 6000

server.listen(port, () => {
  console.log(`Rest API working at port ${port}`)
})


```

In package.json write this lines to run server

```
 "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts "
  },

```

Install colors to best experience on backend

`npm i colors`

#### Create a cluster in Atlas Mongo DB

If you have one, just create a new database.

Remebers your credentials to connect to your cluster.

`mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/`

#### Atlas mongo DB

Connect to your cluster to host your Data Base

<img src="/public/atlaswebpageconnection.png/"/>
 
 Choose Compass to access at your data

<img src="/public/atlaswebpageconnection1.png/"/>

Copy your connection string and go to Compass.
If you need install Compass app in your desktop or just open it.

<img src="/public/atlaswebpageconnection2.png/"/>

Compass

<img src="/public/compassconnection.png"/>

Paste your connection string

`mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/`

Save it and choose any color to recognize it.

---

### Mongoose

MongoDB ODM

ORM is Object Relational Mapping, ODM it the same but the "D" (Document) is because the info stored in collections in MongoDB
We use Mongoose ODM method to CRUD actions
(Others ORM, Prisma, Sequelize, etc.)

Install mongoose

`npm i mongoose`

Install dotenv

`npm i dotenv`

---

#### Create .env file with database credentials

`DATABASE_URL=mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/`

#### Create config folder

Create db.ts file to connecto to mongoDB data base.

```

import mongoose from "mongoose"
import color from "colors"
import { exit } from "node:process"

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL)
    console.log(connection)
  } catch (error) {
    console.log(error.message)
    exit(1)
  }
}


```

---

#### Create Models folder

##### Create Project.ts

```
import mongoose, { Schema, Document } from "mongoose"

export type ProjectType = Document & {
  projectName: string
  clientName: string
  description: string
}

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
    // unique: true, //better do with code
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
})

const Project = mongoose.model<ProjectType>("Project", ProjectSchema)

export default Project

```

---

### Create Controller Folder

Create ProjectController.ts file with functions

```

export class ProjectController {
  static createProjects = async (req: Request, res: Response) => {
    try {
      const project = new Project(req.body)

      await project.save()

      res.status(201).json({
        success: true,
        message: "Project created succesfully",
        data: project,
      })
    } catch (error) {
      console.log(error)
    }

  }

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("All the projects from ProjectController")
  }
}


```

---

### Create Routes folder

Create projectRoutes.ts

```
import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"

const router = Router()

router.post("/", ProjectController.createProjects)

router.get("/", ProjectController.getAllProjects)

export default router


```

---

### Model View Controller (modelo-vista-controlador)

Patron de Arquitectura que permite la separación de obligaciones de cada pieza de tu codigo.

Enfatiza la separación de la logica de programacion con la presentacion.

##### Ventajas

Mejor orden y escalabilidad.
Al implementar una arquitectura probada todos los programadores saben donde encontrar el codigo para realizar una tarea.

Frameworks que usan esta arquitectura: Laravel, Django, NextJS, SpringBoot

---

#### Que es el Modelo? Model?

Encargado a lo relacionado a los datos, Base de datos y el CRUD. Esta muy relacionado a tu ODM o ORM.

El modelo se encarga de consultar la base de datos pero no se encarga de mostrar esos datos.

---

#### Que es la vista? View?

Se encarga de todo lo que se ve en pantalla (HTML)

Modelo se encarga de consultar la DB pero la vista muestra los resultados
En este modelo REACT es la vista.

---

#### Que es el Controlador? Controller?

Comunica Modelo y Vista.
El controlador recibe una respuesta del tipo JSON para que React lo muestre

---

#### Router

Encargado de registrar todas las URL's o Endpoints que soporta nuestra aplicacion.

---

#### MVC is the architecture of this "REST API" project

Another kind of architectures:
Hegagonal
Clean Architecture

---

Install Express Validator

`npm i express-validator`

Add in projectRoutes.ts in each route that I need.

Add imports: `import { body } from "express-validator"`

Add the follows funtions before the route function.
We can add one validator each field input.

`body("projectName").notEmpty().withMessage("Name is required")`
`handleInputErrors`

```
router.post(
  "/", body("projectName").notEmpty().withMessage("Name is required"),
  handleInputErrors,
  ProjectController.createProjects
)

```

We did in routes file because we want that the controller looks clean, only do an action.

Create middleware folder with valitation.ts file
Create handleUnputErrors function

```
import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}


```

When forget any field will be return the error message created in function.
We use this funtion when we need (reusable) and is not necessary repeat this block code in each function

Complete getAllProjects function to show all the projects from his endpoint.

Create getProjectById function and his route plus handleInputErrors

Route:
`router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  ProjectController.getProjectById
)`

Function:

```
static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id)
      if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ error: error.message })
      }
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

```
