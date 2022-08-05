import bcrypt from 'bcrypt'

class HashService {
    saltRounds = 10

    encode = async (text) => {
        return bcrypt.hashSync(text, this.saltRounds)
    }

    check = async (text, hash) => {
        return bcrypt.compareSync(text, hash)
    }

}

export default new HashService()