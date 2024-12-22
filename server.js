const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 88;

app.use(bodyParser.json());

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

  // 只处理 dev 分支的推送
  if (ref === 'refs/heads/master') {
    console.log('Received push to master branch!');
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
        res.status(200).send("Not a master branch push ");
  }
})

app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
