import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable } from "rxjs";
import { tap, filter } from 'rxjs/operators'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("req :>> ", req)

        // req.withCredentials = true 是 read only 無法直接指派
        
        const modifiedReq = req.clone({
            withCredentials: true
        })

        // console.log('modifiedReq :>> ', modifiedReq);
        return next.handle(modifiedReq)
            // 以下展示可以看到更多 Http Request 的 event
            // .pipe(
            //     filter(val=>{
            //         return val.type === HttpEventType.Sent
            //     }),
            //     tap(val=>{
            //         console.log('Sent the request.')
                    
            //         // 如果不用 filter， 可以看到 攔截器 能抓到發出去或者是 server 回應的訊號，從 type 來看出是哪一種事件
            //         // console.log('val :>> ', val);  
                    
            //         // if(val.type === HttpEventType.Sent){
            //         //     console.log('Request was sent to server.')
            //         // }

            //         // if(val.type === HttpEventType.Response){
            //         //     console.log('Got a response from API: >> ', val)
            //         // }
            //     })
            // )
    }
}
