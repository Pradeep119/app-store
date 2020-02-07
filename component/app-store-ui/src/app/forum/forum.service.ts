import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetTopicsParam, TopicResult, CreateTopicParam } from './forum.data.models';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.endpoints';

@Injectable()
export class ForumService{

    constructor(private http:HttpClient){}

    getAllTopics(param:GetTopicsParam):Observable<TopicResult>{
        if(!param){
            param = new GetTopicsParam();
        }
        //TODO: Remove this in prod
        param.page = 1;
        param.parentId = 'common';
        // .......................
        
        let endpoint = ApiEndpoints.forum.topicList+'/start/0/count/10'; //='+param.parentId+'&page='+param.page;

        return this.http.get<TopicResult>(endpoint);
    }

    deleteTopic(topicId:string){
        return this.http.delete(ApiEndpoints.forum.deleteTopic+'?id='+topicId);
    }

    createTopic(param:CreateTopicParam){
        return this.http.post(ApiEndpoints.forum.createTopic,param);
    }
  
    getOneTopic(topicId:string){
        return this.http.get(ApiEndpoints.forum.topicList+'/'+topicId);
    }
}