import AWS from 'aws-sdk'

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS();

const SNS_TOPIC = process.env.AWS_SNS_TOPIC;

  // Publish Message to SNS Topic
  const publish = async (data) => {
    try {
      const params = {
        TopicArn: SNS_TOPIC,
        Message: JSON.stringify(data),
      }
      const res = await sns.publish(params).promise()
      return { success: true, data: res }
    } catch(error) {
      return { success: false, data: null }
    }
  }
  
  // Create Subscription to SNS topic 
  const subscribe = async (body) => {
    try {
      const { protocol, endpoint } = body
      const params = {
        Protocol: protocol,
        TopicArn: SNS_TOPIC,
        Endpoint: endpoint
      }
      const res = await sns.subscribe(params).promise()
      return { success: true, data: res }
    } catch(error) {
      return { success: false, data: null }
    }
  }
    
  // List All Subscriptions to a SNS Topic
  const listSubscriptions = async () => {
    try {
      const params = {
        TopicArn : SNS_TOPIC
      }
      const res = await sns.listSubscriptionsByTopic(params).promise();
      return { success: true, data: res }
    } catch(error) {
      return { success: false, data: null }
    }
  }

    // Unsubscribing from a SNS Topic
    const unsubscribe = async (body) => {
      try {
        const { topicSubscriptionArn } = body
        const params = {
          SubscriptionArn : topicSubscriptionArn
        }
        const res = await sns.unsubscribe(params).promise();
        return { success: true, data: res }
      } catch(error) {
        return { success: false, data: null }
      }
    }

export {
  publish,
  subscribe,
  listSubscriptions,
  unsubscribe,
}
