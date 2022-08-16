import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { factory, primaryKey, manyOf, oneOf } from '@mswjs/data';
import { faker } from '@faker-js/faker';

const ARTIFICIAL_DELAY_MS = 2000

const iconArray = ['BusinessIcon', 'FacebookIcon', 'GitHubIcon', 'GoogleIcon', 'InstagramIcon']

export const db = factory({
    workspace: {
        id: primaryKey(uuidv4),
        workspaceName: String,
        icon: String,
        buckets: manyOf('bucket')
    },
    bucket: {
        id: primaryKey(uuidv4),
        bucketName: String,
        bucketDescription: String,
        workspace: oneOf('workspace'),
        tasks: manyOf('task')
    },
    task: {
        id: primaryKey(uuidv4),
        taskName: String,
        taskDescription: String,
        assignedTo: oneOf('user'),
        //taskDate: String,
        taskBucket: oneOf('bucket'),
    },
    user: {
        id: primaryKey(uuidv4),
        userName: String
    }
})

const generateUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
        userName: `${firstName} ${lastName}`
    }
}

const getIconStringForDisplay = () => {
    const index = Math.floor(Math.random() * (iconArray.length + 1));
    return iconArray[index]
}

for(let i = 0; i < 2; i++) {
    db.user.create(generateUser())
}

const serializeBucket = (bucket) => ({
    ...bucket,
    workspace: bucket.workspace.id
})

const serializeTask = (task) => ({
    ...task,
    assignedTo: task.assignedTo.id,
    taskBucket: task.taskBucket.id
})

export const handlers = [
    rest.get('/fakeApi/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(db.user.getAll())
        )
    }),

    rest.post('/fakeApi/workspace', (req, res, ctx) => {
        const data = req.body
        data.icon = getIconStringForDisplay();
        const workspace = db.workspace.create(data)
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json({...workspace})
        )
    }),

    rest.get('/fakeApi/workspace', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(db.workspace.getAll())
        )
    }),

    rest.post('/fakeApi/bucket', (req, res, ctx) => {
        const data = req.body
        const workspace = db.workspace.findFirst({where : {id: {equals : data.workspace}}})
        data.workspace = workspace
        const bucket = db.bucket.create(data)
        //workspace.buckets = bucket //Linking bucket to workspace
        db.workspace.update({
            where: {
                id: {equals: data.workspace}
            },
            data: {
                buckets: bucket
            }
        })
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(serializeBucket(bucket))
        )
    }),

    rest.get('/fakeApi/bucket', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(db.bucket.getAll())
        )
    }),

    rest.post('/fakeApi/task', (req, res, ctx) => {
        const data = req.body
        const bucket = db.bucket.findFirst({where : {id: {equals : data.taskBucket}}})
        const user = db.user.findFirst({where: {id: {equals: data.assignedTo}}})
        data.taskBucket = bucket;
        data.assignedTo = user;
        const task = db.task.create(data)
        //workspace.buckets = bucket //Linking bucket to workspace
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(serializeTask(task))
        )
    }),

    rest.get('/fakeApi/task', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(db.task.getAll())
        )
    }),

    rest.patch('/fakeApi/task/:taskId', (req, res, ctx) => {
        const { taskBucket } = req.body;
        const updatedBucket = db.bucket.findFirst({where : {id: {equals : taskBucket}}})
        const updatedTask = db.task.update({
            where: { id: { equals: req.params.taskId } },
            data: {
                taskBucket: updatedBucket
            }
        })
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(serializeTask(updatedTask))
        )
    })
]