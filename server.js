const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 88;

app.use(bodyParser.json());

// Webhook 监听端点
app.post('/webhook', (req, res) => {
  const { ref } = req.body;

  // 只处理 dev 分支的推送
  if (ref === 'refs/heads/dev') {
    console.log('Received push to dev branch!');
    // 执行拉取和部署命令
    exec('git pull origin dev && npm install && npm run build',{cwd : '/home/dev/MaiWeb-CN'}, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        res.status(500).send('Deployment failed');
        return;
      }
      console.log(stdout);
      res.status(200).send('Deployment successful');
    });
  } else {
	console.log(ref)
        res.status(200).send("Not a dev branch push ");
  }
});

app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
