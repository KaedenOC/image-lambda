import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Response } from 'node-fetch';

export const handler = async(event) => {
    console.log('event', event);
    
    let s3Client = new S3Client({region: 'us-west-1'});
    let name = event.Records[0].s3.object.key;
    let size = event.Records[0].s3.object.size;
    let type = '.jpg';
    let newImageDetails = { name, size, type };
    console.log('new image info', newImageDetails);
    
    let data = {
        Bucket: 'kaedenoc-images',
        Key: 'images.json'
    }
    
    let imageDetails;
    
    try {
        let result = await s3Client.send(new GetObjectCommand(data));
        let response = new Response(result.body);
        let getJson = await response.json();
        imageDetails = getJson;
    } catch(error) {
        console.log('get object error', error);
        imageDetails = [];
    }
    imageDetails.push(newImageDetails);
    console.log('image details array', imageDetails);
    
    let strDetails = JSON.stringify(imageDetails); //stringify the array
    
    
    //put command
    let putData = {
        ...data,
        Body: strDetails,
        ContentType: 'application/json' //always for json
    }
    
    try {
        await s3Client.send(new PutObjectCommand(putData));
    } catch(error){
        console.warn('failed put command', error);
    }
    
 
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: strDetails,
    };
    return response;
};
