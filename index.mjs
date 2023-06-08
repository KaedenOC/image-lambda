import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Response } from 'node-fetch';

export const handler = async(event) => {
    console.log('event', event);
    //create s3 client connection
    const s3Client = new S3Client({region: "us-west-1"});
    
    // const Bucket = event.Records[0].s3.bucket.name;
    const params = {
        key: event.Records[0].s3.object.key,
        Bucket: 'kaedenoc-images',
    }
    console.log(params);
    
    let myJson;
    
    try {
        myJson = await s3Client.send(new GetObjectCommand(params));
        const response = new Response(myJson.body);
        myJson = await response.json()
    } catch(error){
        console.log("Handler Event", JSON.stringify(event, undefined, "  "));
    }
    
    console.log('json', myJson.body);
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('hello'),
    };
    return response;
};
