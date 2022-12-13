import app from './server'
import * as dotenv from 'dotenv'

dotenv.config()

const port = 3001

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
