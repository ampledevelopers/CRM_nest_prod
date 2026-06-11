import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcseFormService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
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

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

addMacACSEdetails(branchId: string,family: string, macReptatRepair: string,macEligibleRepair: string,macRepairPpr: string,macPprEligibleRepair: string,macRepeatedSerials: string,macLoopedRepairs: string) {
  const form = 'user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family + '&mac_reptat_repair=' + macReptatRepair + '&mac_eligible_repair=' + macEligibleRepair + '&mac_repair_PPR=' + macRepairPpr + '&mac_PPR_eligible_repair=' + macPprEligibleRepair + '&mac_repeated_serials=' + macRepeatedSerials + '&mac_looped_repairs=' + macLoopedRepairs  ;
  return this.http.post(this.nestUrl + 'ticket_edit/add_acse_details', form, {headers : this.getHeaders()});
}

addiPhoneACSEdetails(branchId: string,family: string, iphoneReptatRepair: string,iphoneEligibleRepairs: string,iphoneSdrEvents: string,iphoneSdr: string,iphoneNtf: string,iphoneNoTrouble: string,iphoneSurRepairs: string,iphoneSurOpp: string) {
  const form = 'user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&iphone_reptat_repair=' + iphoneReptatRepair + '&iphone_eligible_repairs=' + iphoneEligibleRepairs + '&iphone_sdr_events=' + iphoneSdrEvents + '&iphone_SDR=' + iphoneSdr + '&iphone_NTF=' + iphoneNtf + '&iphone_no_trouble=' + iphoneNoTrouble + '&iphone_SUR_repairs=' + iphoneSurRepairs + '&iphone_SUR_Opp=' + iphoneSurOpp ;
  return this.http.post(this.nestUrl + 'ticket_edit/add_acse_details', form, {headers : this.getHeaders()});
}

updateMacACSEdetails(branchId: string,family: string, macReptatRepair: string,macEligibleRepair: string,macRepairPpr: string,macPprEligibleRepair: string,macRepeatedSerials: string,macLoopedRepairs: string) {
  const form = 'user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&mac_reptat_repair=' + macReptatRepair + '&mac_eligible_repair=' + macEligibleRepair + '&mac_repair_PPR=' + macRepairPpr + '&mac_PPR_eligible_repair=' + macPprEligibleRepair + '&mac_repeated_serials=' + macRepeatedSerials + '&mac_looped_repairs=' + macLoopedRepairs  ;
  return this.http.post(this.nestUrl + 'ticket_edit/update_acse_details', form, {headers : this.getHeaders()});
}

updateiPhoneACSEdetails(branchId: string,family: string, iphoneReptatRepair: string,iphoneEligibleRepairs: string,iphoneSdrEvents: string,iphoneSdr: string,iphoneNtf: string,iphoneNoTrouble: string,iphoneSurRepairs: string,iphoneSurOpp: string) {
  const form = 'user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&iphone_reptat_repair=' + iphoneReptatRepair + '&iphone_eligible_repairs=' + iphoneEligibleRepairs + '&iphone_sdr_events=' + iphoneSdrEvents + '&iphone_SDR=' + iphoneSdr + '&iphone_NTF=' + iphoneNtf + '&iphone_no_trouble=' + iphoneNoTrouble + '&iphone_SUR_repairs=' + iphoneSurRepairs + '&iphone_SUR_Opp=' + iphoneSurOpp ;
  return this.http.post(this.nestUrl + 'ticket_edit/update_acse_details', form, {headers : this.getHeaders()});
}

}
