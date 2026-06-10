import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcseFormService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
}

addMacACSEdetails(branchId: string,family: string, macReptatRepair: string,macEligibleRepair: string,macRepairPpr: string,macPprEligibleRepair: string,macRepeatedSerials: string,macLoopedRepairs: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family + '&mac_reptat_repair=' + macReptatRepair + '&mac_eligible_repair=' + macEligibleRepair + '&mac_repair_PPR=' + macRepairPpr + '&mac_PPR_eligible_repair=' + macPprEligibleRepair + '&mac_repeated_serials=' + macRepeatedSerials + '&mac_looped_repairs=' + macLoopedRepairs  ;
  return this.http.post(this.rootUrl + 'api/tickets/add_acse_details', form, {headers : this.reqHeader});
}

addiPhoneACSEdetails(branchId: string,family: string, iphoneReptatRepair: string,iphoneEligibleRepairs: string,iphoneSdrEvents: string,iphoneSdr: string,iphoneNtf: string,iphoneNoTrouble: string,iphoneSurRepairs: string,iphoneSurOpp: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&iphone_reptat_repair=' + iphoneReptatRepair + '&iphone_eligible_repairs=' + iphoneEligibleRepairs + '&iphone_sdr_events=' + iphoneSdrEvents + '&iphone_SDR=' + iphoneSdr + '&iphone_NTF=' + iphoneNtf + '&iphone_no_trouble=' + iphoneNoTrouble + '&iphone_SUR_repairs=' + iphoneSurRepairs + '&iphone_SUR_Opp=' + iphoneSurOpp ;
  return this.http.post(this.rootUrl + 'api/tickets/add_acse_details', form, {headers : this.reqHeader});
}

updateMacACSEdetails(branchId: string,family: string, macReptatRepair: string,macEligibleRepair: string,macRepairPpr: string,macPprEligibleRepair: string,macRepeatedSerials: string,macLoopedRepairs: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&mac_reptat_repair=' + macReptatRepair + '&mac_eligible_repair=' + macEligibleRepair + '&mac_repair_PPR=' + macRepairPpr + '&mac_PPR_eligible_repair=' + macPprEligibleRepair + '&mac_repeated_serials=' + macRepeatedSerials + '&mac_looped_repairs=' + macLoopedRepairs  ;
  return this.http.post(this.rootUrl + 'api/tickets/update_acse_details', form, {headers : this.reqHeader});
}

updateiPhoneACSEdetails(branchId: string,family: string, iphoneReptatRepair: string,iphoneEligibleRepairs: string,iphoneSdrEvents: string,iphoneSdr: string,iphoneNtf: string,iphoneNoTrouble: string,iphoneSurRepairs: string,iphoneSurOpp: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId +'&family=' + family  + '&iphone_reptat_repair=' + iphoneReptatRepair + '&iphone_eligible_repairs=' + iphoneEligibleRepairs + '&iphone_sdr_events=' + iphoneSdrEvents + '&iphone_SDR=' + iphoneSdr + '&iphone_NTF=' + iphoneNtf + '&iphone_no_trouble=' + iphoneNoTrouble + '&iphone_SUR_repairs=' + iphoneSurRepairs + '&iphone_SUR_Opp=' + iphoneSurOpp ;
  return this.http.post(this.rootUrl + 'api/tickets/update_acse_details', form, {headers : this.reqHeader});
}

}
