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
        taskBucket: oneOf('bucket')
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
    console.log("index", index);
    return iconArray[index]
}

for(let i = 0; i < 2; i++) {
    db.user.create(generateUser())
}

const serializeBucket = (bucket) => ({
    ...bucket,
    workspace: bucket.workspace.id
})

export const handlers = [
    rest.get('/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(db.user.getAll())
        )
    }),

    rest.post('/workspace', (req, res, ctx) => {
        const data = req.body
        data.icon = getIconStringForDisplay();
        const workspace = db.workspace.create(data)
        console.log(workspace);
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json({...workspace})
        )
    }),

    rest.get('/workspace', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(db.workspace.getAll())
        )
    }),

    rest.post('/bucket', (req, res, ctx) => {
        const data = req.body
        console.log("data", data);
        const workspace = db.workspace.findFirst({where : {id: {equals : data.workspace}}})
        data.workspace = workspace
        const bucket = db.bucket.create(data)
        console.log(serializeBucket(bucket));
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(serializeBucket(bucket))
        )
    }),

    rest.get('/bucket', (req, res, ctx) => {
        return res(
            ctx.delay(ARTIFICIAL_DELAY_MS),
            ctx.status(200),
            ctx.json(db.bucket.getAll())
        )
    })
]