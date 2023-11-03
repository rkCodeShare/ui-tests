import { Reporter } from '@playwright/test/reporter';
import supertest from 'supertest';
const apiRequest = supertest('https://hooks.slack.com/services/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');
let body:any;
let testResult = {
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Test report*`
      },
    },
    {
      type: 'divider',
    },
  ],
}; 

class MyReporter implements Reporter {  

  onTestEnd(test:any, result:any) {        
    let testTitle = test.title;
    let testOutcome = test.outcome();    
    if (testOutcome === "skipped") {
      testResult.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:mask: *Skipped test:* \`${test.parent.title}\` - ${testTitle}."`
        }
      })
    } else if (testOutcome === "flaky") { 
      testResult.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:smiling_face_with_tear: *Flaky test:* \`${test.parent.title}\` - ${testTitle}", but passed!`
        }
      })
    } else if (testOutcome === "unexpected" && result.retry > 1) {
      testResult.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:x: *Failed test:* \`${test.parent.title}\` - ${testTitle}."`
        }
      })
      let message = result.error.message;
      message = message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'');
      testResult.blocks.push({
          type: 'section',
          text: {
              type: 'mrkdwn',
              text: `\`\`\`${message}\`\`\``
        }
      })
    } else if (testOutcome === "expected") {
      testResult.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `✅ *Passing test:* \`${test.parent.title}\` - ${testTitle}."`
        }
      })
    }    
  }

  async onEnd(result:any) {    
    
    if (result.status === `passed`){      
      body = {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:tada: *zip-web-cards - Your test report is in, all tests passed!*`
            },
          },
          {
            type: 'divider',
          },
        ],
      };    
    }
    else{
      body = {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:alert: *zip-web-cards - Your test report is in, we've got failing test/s.*`
            },
          },
          {
            type: 'divider',
          },
        ],
      };    
    }


    testResult.blocks.forEach(element => {
      body.blocks.push(element);
    });
   

    body.blocks.push({ type: 'divider' });
    body.blocks.push({
      type: 'context',
      elements: [
          {
              type: 'mrkdwn',
              text: `Test Report generated at ${new Date().toLocaleString('en-US')}`
          }
      ]
    });
    
    //console.log('slack payload - ' + JSON.stringify(body));
    const response = await apiRequest
            .post('')
            .set({
                'Content-Type': 'application/json'
            })
            .send(JSON.stringify(body))
            .catch((error) => error.response);

    if (response.status === 200){
      console.log('Slack report has been sent!');    
    }

  }
}
export default MyReporter;
