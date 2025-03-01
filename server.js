const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const mailRouter = require('./routes/mail.js'); // 引入邮件发送路由
require('dotenv').config(); // 加载环境变量
const cors = require('cors');

const app = express();
const port = 88;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Webhook 监听端点
app.post('/webhook/front', (req, res) => {
  const { ref,repository } = req.body;
  const scriptPath = path.resolve('/home/dev/frontCD.sh'); // 替换为实际脚本路径
  const repoName = repository ? repository.name : 'Unknown Repository';
  console.log(`Received push from repository: ${repoName}`);

  // 只处理 dev 分支的推送
  if (ref === 'refs/heads/dev') {
    console.log('Received push to dev branch!');
    // 执行拉取和部署命令
    exec(scriptPath, (err, stdout, stderr) => {
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

app.post('/webhook/back', (req, res) => {
  const { ref,repository } = req.body;
  const scriptPath = path.resolve('/home/dev/backCD.sh'); // 替换为实际脚本路径
  const repoName = repository ? repository.name : 'Unknown Repository';
  console.log(`Received push from repository: ${repoName}`);

  // 只处理 main 分支的推送
  if (ref === 'refs/heads/main') {
    console.log('Received push to main branch!');
    // 执行拉取和部署命令
    exec(scriptPath, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        res.status(500).send('Deployment failed');
        return;
      }
      console.log(stdout);
      res.status(200).send('Deployment successful');
    });
  } else {
    console.log(ref);
    res.status(200).send("Not a main branch push");
  }
})

app.use('/api', mailRouter); // 使用邮件发送路由


app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
