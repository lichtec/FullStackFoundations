var test;

var organizations = [
    {id:1, name: 'Bob\'s Mowers', selected: false},
    {id:2, name: 'John\'s Bike Barn', selected: false},
    {id:3, name: 'Josh\'s Lemonade', selected: false},
    {id:4, name: 'Kevin\'s Disc Bar', selected: false},
    {id:5, name: 'Thomas\'s Guitars', selected: false}
    ];

var selectedOrganizations = [
    {id:10, organization: {id:2, name: 'John\'s Bike Barn', selected: false}},
    {id:11, organization: {id:4, name: 'Kevin\'s Disc Bar', selected: false}}
    ];

var organizationsResult = [];

function test() {
    organizationsResult = organizations;
    for (i = 0; i < selectedOrganizations.length; i++) {
        var selectedOrg = selectedOrganizations[i].organization.id;
        //alert(selectedOrg);
        var found = _.find(organizationsResult, function(org){return org.id == selectedOrg});
        alert(found);
        if(found !== undefined) {
            organizationsResult[_.indexOf(organizationsResult, found)].selected=true;
        }
    }
     return organizationsResult;
}

$( document ).ready(test);