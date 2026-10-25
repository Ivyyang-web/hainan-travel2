import {POST} from '../../lib/memories.js';
import {withPhotoStorage} from '../../lib/storage.js';
export async function onRequestPost({request,env}){return POST(request,withPhotoStorage(env))}
