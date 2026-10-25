import {GET} from '../../../lib/photos.js';
import {withPhotoStorage} from '../../../lib/storage.js';
export async function onRequestGet({request,env}){return GET(request,withPhotoStorage(env))}
