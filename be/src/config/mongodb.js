
import { env } from './enviroment'
import { MongoClient, ServerApiVersion } from 'mongodb'

let bookDatabaseInstance = null

// Khoi tao 1 doi tuong Client de ket noi den MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
  tls: true,
  tlsInsecure: true
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Goi ket noi toi MongoDB Atlats voi URI da khai bao trong than cua clientInstance
  await mongoClientInstance.connect()

  // Ket noi thanh cong thi lay Database theo ten va gan nguoc no lai vao bien trelloDatabaseInstance o tren
  bookDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Dong ket noi toi MongoDB khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}


// Trong nay (khong co async) co nhiem vu export cai Trello Database Intance sau khi da connect thanh cong toi MongoDB de chung ta su dung o nhieu noi khac nhau trong code.
// Phai dam bao chi goi cai getDB nay sau khi da ket noi thanh cong toi MongoDB
export const GET_DB = () => {
  if (!bookDatabaseInstance) throw new Error('Ket noi toi Database truoc da')
  return bookDatabaseInstance
}

