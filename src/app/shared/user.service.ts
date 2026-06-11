import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operator';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as AWS from "@aws-sdk/client-s3";
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class UserService {
  rootUrl = localStorage.getItem('rootUrl');
  reportsUrl = localStorage.getItem('reportsUrl');
  reportUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
  selectedWidget: any = 'Pre-Repair';
  allWidgets: any = [];
  isGroup = false;
  private selectedWid: any = new Subject<any>();
  public s3: any;
  public aws: any;
  datePipe = new DatePipe('en-US');
   
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    };


    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + 'user/', body, { headers: reqHeader });
  }

  userAuthentication(userName: string, password: string) { // alert(userName);
    const data = 'mobile=' + userName + '&password=' + password + '&grant_type=password';

    return this.http.post(this.nestUrl + 'auth/flogin', data, { headers: this.getHeaders() });

  }

  getMenu(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/get_menu', data, { headers: this.getHeaders() });
  }

  getWidget(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/get_widget', data, { headers: this.getHeaders() });
  }

  getWidgetOnly(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/get_only_widget', data, { headers: this.getHeaders() });
  }

  getMenuPermission(groupID: string, subMenu: string) {
    const data = 'group=' + groupID + '&submenu=' + subMenu + '&user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode') +
      '';
    return this.http.post(this.nestUrl + 'dashboard/get_menu_permission', data, { headers: this.getHeaders() });
  }

  userLogVisit(subMenu: string) {
    const data = 'menu_name=' + subMenu + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'dashboard/log_menu_visit', data, { headers: this.getHeaders() });
  }

  getWidgetPermission(groupID: string, statusId: string) {
    const data = 'status_id=' + statusId + '&group_id=' + groupID;
    return this.http.post(this.nestUrl + 'user/get_widget_permission', data, { headers: this.reqHeader });
  }

  getUser(userId: string) {
    const data = 'user_id=' + userId;
    return this.http.post(this.nestUrl + 'common/get_user', data, { headers: this.getHeaders() });
  }

  setUser(userId: any, user: any) {
    const data = 'user_id=' + userId + '&data=' + user + '';
    return this.http.post(this.nestUrl + 'manage-user/update_user', data, { headers: this.getHeaders() });
  }
  getTasks(data: string) {
    /// var data = "group=" + groupID+"user_id=" + userId+ "&data=" + user+'';
    return this.http.post(this.nestUrl + 'dashboard/get_tasks', data, { headers: this.getHeaders() });
  }

  getNotifications(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/get_notifications', data, { headers: this.getHeaders() });
  }

  resetPassword(userId: any, user: any) {
    const data = 'user_id=' + userId + '&data=' + user + '';
    return this.http.post(this.nestUrl + 'auth/reset_password', data, { headers: this.getHeaders() });
  }

  userOtpAuthentication(mobile: string, otp: string) { // alert(userName);
    const data = 'mobile=' + mobile + '&otp=' + otp + '&grant_type=password';
    return this.http.post(this.nestUrl + 'auth/otplogin', data, { headers: this.getHeaders() });
  }

  authenticateGSX(key: string) {
    let form;
    if (key === '') {
      form = 'user_id=' + localStorage.getItem('userId') + '';
    } else {
      form = 'user_id=' + localStorage.getItem('userId') + '' + '&gsx_api_key=' + key;
    }
    return this.http.post(this.rootUrl + 'api/gsxapi/get_auth_token', form, { headers: this.reqHeader });
  }

  dCallFetch(fromDate: any, toDate: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.post(this.rootUrl + 'api/gsxapi/d_call', form, { headers: this.reqHeader });
  }

  mapCrmGsx(ticketId: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/gsxapi/map_gsx_crm_repair_status', form, { headers: this.reqHeader });
  }

  mapPartConstraint(ticketId: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/gsxapi/map_parts_constraint', form, { headers: this.reqHeader });
  }

  mapBlueDartTrack(ticketId: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/gsxbatchapi/repair_shipping_tracking_auto', form, { headers: this.reqHeader });
  }

  logoutGSX() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/authenticate_end_session', form, { headers: this.reqHeader });
  }

  getMessageBoard(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/get_message_board', data, { headers: this.getHeaders() });
  }

  getAllMessageBoard(data: string) {
    // return this.http.post(this.rootUrl + 'api/common/get_all_message', data, { headers: this.reqHeader });
    return this.http.post(this.nestUrl + 'dashboard/get_all_message', data, { headers: this.getHeaders() });
  }

  getSMSMessages() {
    const form = 'user_id=' + localStorage.getItem('userId') + '&status=' + 'U';
    return this.http.post(this.nestUrl + 'common/get_message', form, { headers: this.getHeaders() });
  }

  getAllSMS() {
    const form = 'user_id=' + localStorage.getItem('userId') + '&status=' + 'R';
    return this.http.post(this.nestUrl + 'common/get_message', form, { headers: this.getHeaders() });
  }

  setMessageFlag(data: string) {
    return this.http.post(this.nestUrl + 'dashboard/set_message_flag', data, { headers: this.getHeaders() });
  }

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, { headers: this.getHeaders() });
  }

  getUserList() {
    const form = '';
    return this.http.post(this.nestUrl + 'common/get_users', form, { headers: this.getHeaders() });
  }

  sendMessage(inputData: string) {
    const form = 'from_user=' + localStorage.getItem('userId') + inputData;
    return this.http.post(this.rootUrl + 'api/message/save_message', form, { headers: this.reqHeader });
  }

  updateMessage(messageId: string) {
    const form = 'from_user=' + localStorage.getItem('userId') + '&id=' + messageId;
    return this.http.post(this.nestUrl + 'dashboard/update_status', form, { headers: this.getHeaders() });
  }

  switchType(siteType: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&site_type_id=' + siteType;
    return this.http.post(this.rootUrl + 'api/common/change_site', form, { headers: this.reqHeader });
  }

  getCertificates() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/common/atlas_certifications?' + form, { headers: this.reqHeader });
  }

  certificateRegister(docs: any, group: string, id: string, date: string) {
    const documents = JSON.stringify(docs);
    const form = 'user_id=' + localStorage.getItem('userId') + '&documents=' + documents +
      '&certification_group=' + group + '&certification_id=' + id + '&completion_date=' + date;
    return this.http.post(this.rootUrl + 'api/common/atlas_certifications', form, { headers: this.reqHeader });
  }

  widgetClicked(widgetSelected: any) {
    this.selectedWidget = widgetSelected;
    this.selectedWid.next();// = widgetSelected;
  }

  getSelectedWidget(): Observable<any> {
    //return this.selectedWidget;
    return this.selectedWid.asObservable();
  }

  // async uploadFileToS3Bucket(file: File, bucketName: string, fileName: string, folder?: string): Promise<string> {
  //   this.getAWSconfig();
  //   let fileKey = `${fileName}`;
  //   if(folder) {
  //     fileKey = `${folder}/${fileName}`;
  //   }
  //   try {
  //     const command = new AWS.PutObjectCommand({
  //       Bucket: bucketName,
  //       Key: fileKey,
  //       Body: file,
  //     });

  //     const response = await this.s3.send(command);


  //     // The file has been uploaded successfully. You can get the URL of the uploaded file.
  //     const fileUrl = `https://${bucketName}.s3.${this.aws.region}.amazonaws.com/${fileKey}`;
  //     return fileUrl;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }
private uploadMultipart(file: File, bucketName: string, fileName: string, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('X_API_KEY', localStorage.getItem('userToken') || '');
  formData.append('user_id', localStorage.getItem('userId') || '');
  formData.append('bucketName', bucketName);
  formData.append('fileName', fileName);
  formData.append('folder', folder);
  formData.append('file', file, fileName);
  const headers = new HttpHeaders({ 'No-Auth': 'True' });
  return firstValueFrom(
    this.http.post<any>(this.rootUrl + 'api/cdata/upload_to_s3', formData, { headers }).pipe(timeout(600000))
  ).then(response => {
    if (response?.status && response?.url) return response.url;
    throw new Error(response?.message || 'Upload failed');
  });
}

async uploadFileToS3Bucket(file: File, bucketName: string, fileName: string, folder?: string): Promise<string> {
  try {
    return await this.uploadMultipart(file, bucketName, fileName, folder || '');
  } catch (error: any) {
    const msg = error?.error?.message ?? error?.message ?? (error?.status != null ? `HTTP ${error.status}: ${error.statusText || 'Unknown'}` : 'Upload failed');
    console.error('Error uploading file:', msg, error);
    throw new Error(msg);
  }
}


// async uploadVideoS3Bucket(file: File, bucketName: string, folder: string, fileName?: string): Promise<string> {
//   this.getAWSconfig();
//   const extension = file.type.split('/')[1];
//   let filename = '';
//   if(fileName) {
//     filename = fileName;
//   } else {
//     filename = 'video.' + extension;
//   }
//   const fileKey = `${folder}/${filename}`;

//   try {
//     const command = new AWS.PutObjectCommand({
//       Bucket: bucketName,
//       Key: fileKey,
//       Body: file,
//     });

//     const response = await this.s3.send(command);

//     // The file has been uploaded successfully. You can get the URL of the uploaded file.
//     const fileUrl = `https://${bucketName}.s3.${this.aws.region}.amazonaws.com/${fileKey}`;
//     return fileUrl;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// }

  // async uploadVideoS3Bucket(file: File, bucketName: string, folder: string, fileName?: string): Promise<string> {
  //   const extension = file.type.split('/')[1];
  //   const filename = fileName || ('video.' + (extension || 'bin'));
  //   try {
  //     const base64 = await this.fileToBase64(file);
  //     return await this.uploadToS3FormUrlEncoded(base64, bucketName, filename, folder);
  //   } catch (error: any) {
  //     const msg = error?.error?.message ?? error?.message ?? (error?.status != null ? `HTTP ${error.status}: ${error.statusText || 'Unknown'}` : 'Upload failed');
  //     console.error('Error uploading file:', msg, error);
  //     throw new Error(msg);
  //   }
  // }
async uploadVideoS3Bucket(
  file: File,
  bucketName: string,
  folder: string,
  fileName?: string
): Promise<string> {

  const filename = fileName || file.name;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucketName', bucketName);
  formData.append('fileName', filename);
  formData.append('folder', folder);
  formData.append('X_API_KEY', localStorage.getItem('userToken') || '');
  formData.append('user_id', localStorage.getItem('userId') || '');

  const headers = new HttpHeaders({
    'No-Auth': 'True'
  });

  const res: any = await firstValueFrom(
    this.http.post(
      this.rootUrl + 'api/cdata/upload_to_s3',
      formData,
      { headers }
    )
  );

  if (!res?.status) {
    throw new Error(res?.message || 'Upload failed');
  }

  return res.url;
}

  // async pudImageUploadS3Bucket(file: File, bucketName: string, folder: string, filename: string){
  //   this.getAWSconfig();
  //   const fileKey = `${folder}/${filename}`;
  //   try {
  //     const params = {
  //       Bucket: bucketName,
  //       Key: fileKey,
  //       Body: file,
  //     };
  //     const uploadCommand = new AWS.PutObjectCommand(params);

  //     this.s3.send(uploadCommand)
  //       .then(() => {
  //       })
  //       .catch((error: any) => {
  //         console.error('Error uploading image:', error);
  //       });
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }
  async pudImageUploadS3Bucket(file: File, bucketName: string, folder: string, filename: string): Promise<string> {
    try {
      return await this.uploadMultipart(file, bucketName, filename, folder);
    } catch (error: any) {
      const msg = error?.error?.message ?? error?.message ?? (error?.status != null ? `HTTP ${error.status}: ${error.statusText || 'Unknown'}` : 'Image upload failed');
      console.error('Error uploading image:', msg, error);
      throw new Error(msg);
    }
  }

  async getObjectFromS3Bucket(bucketName: string, objectKey: string): Promise<any> {
    this.getAWSconfig();
    try {
      const command = new AWS.GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });

      let response: any = await this.s3.send(command);
      // Return the object's data (image content or any other type)
      const buffer = await this.readStreamAsBuffer(response.Body);
      const base64Image = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const mimeType = response.ContentType;
      return `data:${mimeType};base64,${base64Image}`;

    } catch (error) {
      console.error('Error getting object from S3:', error);
      throw error;
    }
  }

  private async readStreamAsBuffer(stream: ReadableStream<any>): Promise<ArrayBuffer> {
    this.getAWSconfig();
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
    while (!done) {
      const { value, done: isDone } = await reader.read();
      done = isDone;
      if (value) {
        chunks.push(value);
      }
    }
    const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
    const buffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }
    return buffer.buffer;
  }

  // async deleteFileFromS3Bucket(bucketName: string, fileName: string): Promise<string> {
  //   this.getAWSconfig();
  //   const fileKey = `${fileName}`;

  //   try {
  //     const command = new DeleteObjectCommand({
  //       Bucket: bucketName,
  //       Key: fileKey,
  //     });

  //     const response = await this.s3.send(command);

  //     return 'File deleted successfully';
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //     throw error;
  //   }
  // }

  async deleteFileFromS3Bucket(bucketName: string, fileName: string): Promise<string> {

    const body =
      'bucketName=' + encodeURIComponent(bucketName) +
      '&fileName=' + encodeURIComponent(fileName) +
      '&X_API_KEY=' + encodeURIComponent(localStorage.getItem('userToken') || '') +
      '&user_id=' + encodeURIComponent(localStorage.getItem('userId') || '');
  
    const res: any = await firstValueFrom(
      this.http.post(
        this.rootUrl + 'api/cdata/delete_from_s3',
        body,
        { headers: this.reqHeader }
      )
    );
  
    if (!res?.status) {
      throw new Error(res?.message || 'Delete failed');
    }
  
    return res.message;
  }

  updateS3File(commonData: any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = 'user_id=' + localStorage.getItem('userId') + commonData;
    return this.http.post(this.rootUrl + 'api/tickets/s3_data', form, { headers: this.reqHeader });
  }

  updateS3FileTekne(commonData: any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = 'user_id=' + localStorage.getItem('userId') + commonData;
    return this.http.post(this.rootUrl + 'api/accytickets/s3_data', form, { headers: this.reqHeader });
  }

  deleteS3File(bucketName: any, fileName: any, ticket_id: any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = 'user_id=' + localStorage.getItem('userId') + '&bucket_name=' + bucketName + '&file_id=' + fileName + '&ticket_id=' + ticket_id;
    return this.http.post(this.rootUrl + 'api/tickets/delete_s3_data', form, { headers: this.reqHeader });
  }

  /* updateS3File_raf(commonData: any) {
    alert('inside');
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const form = 'user_id=' + localStorage.getItem('userId') + commonData;
    return this.http.post(this.rootUrl + 'tickets/AWSS3_upload/uploadFileToS3', form, { headers: this.reqHeader });
  } */

  async getVideoObjectFromS3(bucketName: string, objectKey: string): Promise<Blob> {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')
      + '&user_id=' + localStorage.getItem('userId')
      + '&bucket_name=' + encodeURIComponent(bucketName)
      + '&object_key=' + encodeURIComponent(objectKey);
    return firstValueFrom(
      this.http.post(this.rootUrl + 'api/cdata/get_s3_file', form, {
        headers: this.reqHeader,
        responseType: 'blob'
      }).pipe(timeout(120000))
    );
  }

  getS3FileDetails(ticket_id: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.rootUrl + 'api/tickets/s3_data?' + form, { headers: this.reqHeader });
  }

  getS3FileDetails_tekne(ticket_id: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.rootUrl + 'api/accytickets/s3_data?' + form, { headers: this.reqHeader });
  }

  invoiceSummaryFetch() {
    const form = 'user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode');
    return this.http.post(this.rootUrl + 'api/gsxapi/invoice_summary', form, { headers: this.reqHeader });
  }

  getAWSconfig() {
    this.aws = {
      region: localStorage.getItem('aws_region'),
      accessKeyId: localStorage.getItem('aws_key'),
      secretAccessKey: localStorage.getItem('aws_secret_key'),
    }
    this.s3 = new AWS.S3Client({
      region: this.aws.region,
      credentials: {
        accessKeyId: this.aws.accessKeyId,
        secretAccessKey: this.aws.secretAccessKey,

      },
        requestChecksumCalculation: "WHEN_REQUIRED",

    })
    // console.log(this.s3)
    return this.s3;
  }
  getBinAgeingBranch(data: { user_id: string | null, branch_code: string | null }) {
  const form = '' +
               '&user_id=' + data.user_id +
               '&branch_code=' + data.branch_code;
  return this.http.post(this.reportsUrl + 'reports/branch_bin_ageing_dashboard', form, { headers: this.getHeaders() });
}
  getBranchAgeingTicketList(family: string, type: string, statusId: string, countType: string, branchId: string) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&family=' + family + '&type=' + type  + '&status_id=' + statusId + '&count_type=' + countType + '&branch_id=' + branchId ;
    return this.http.post(this.reportUrl + 'api/reports/branch_ageing_ticket_list', form, {headers : this.reqHeader});
  }
  logDashboardEvent(logData: any) {
    const form = 'user_id=' + logData.user_id +  '&branch_code=' + logData.branch_code;
    return this.http.post(this.rootUrl + 'api/charts/log_dashboard', form, { headers: this.reqHeader });
  }

}
