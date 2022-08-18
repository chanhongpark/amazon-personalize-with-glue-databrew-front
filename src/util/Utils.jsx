import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import config from '../config.json';

export async function dispatchUserEvent(data) {
    // var user = "1test"

    const config_api_url = config.ApiUrl;

    // populate basic event
    // React에서는 Date를 밀리세컨드로 보내고, Personalize에서는 세컨드로 보낸다
    var Data = { 
        
        USER_ID: data['UserId'],
        ITEM_ID: data['movieId'] ?? '',
        RATING: data['Rating'],
        TIMESTAMP: (Date.now()).toString(),
        EVENT_TYPE: data['EVENT_TYPE'] ?? '',
    }
    // var event_to_kinesis = {
    //     "Data":  event
    // }
    
    var PartitionKey = uuidv4()
    // Object.assign(event_to_kinesis);

    // event['meta'] = meta;
    // console.log(JSON.stringify(event_to_kinesis));

    // Push to Kinesis putAPI
    // const url = "https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/stream/demogoprime-kinesis-stream-test/record";
    const url = `${config_api_url}/stream`

    // console.log('send event data🎉🎉🎉🎉',Data)

    await axios.post(url, {
        Data, PartitionKey
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
    
}
