public with sharing class SearchOpportunity {
    @AuraEnabled(Cacheable='true')

    public static List<Opportunity> getOpp(String oppName) {
        String searchkey= '%' +oppName+ '%';
        List<Opportunity> retrivedOpportunities= new List<Opportunity>();
        List<Opportunity> myOpportunities= new List<Opportunity>();
        try {
            retrivedOpportunities=[SELECT Id,Name,Account.Name,StageName,Type,Amount FROM Opportunity WHERE Name LIKE: searchKey];
            for(Opportunity opp: retrivedOpportunities ){
                myOpportunities.add(opp);
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error in finding Records');
        }
        if(myOpportunities.size() == 0){
            throw new AuraHandledException('No Records Found..'); 
         }
        return myOpportunities;
    }
    
}
