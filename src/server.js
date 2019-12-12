import { app } from './app'
import { constants } from './common'

const PORT = process.env.PORT || constants.PORT

app.listen(PORT, () => console.log(`Server is starting at port: ${PORT}`))
