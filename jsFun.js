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

var test;

var Shape = function(width, height) {
    this.width = width;
    this.height = height;
    this.type = 'Fill this in';
};

Shape.prototype.getArea = function() { return 0; };
Shape.prototype.getType = function() { return 'This is a ' + this.type; };


var Rectangle = function(width, height) {
    Shape.call(this, width, height);
    this.type = 'Rectangle';
};

Rectangle.prototype = new Shape();
Rectangle.prototype.getArea = function() { return (this.width * this.height); };

var Circle = function(width, height) {
    Shape.call(this, width, height);
    this.type = 'Circle';
};

Circle.prototype = new Shape();
Circle.prototype.getType = function() { return 'I am a ' + this.type + '!'; };
Circle.prototype.getArea = function() { return (Math.pow(this.width/2, 2) * Math.PI ); };

function test() {
    
    var a = new Rectangle(1, 2);
    
    alert(a.getType());
    alert(a.getArea());
    
    var b = new Circle(2, 2);
    
    alert(b.getType());
    alert(b.getArea());
}
$( document ).ready(test);

var test;

/*Thanks belong to James Roberts: http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/ */

String.prototype.toCamel = function () {
    return this.replace(/([-_][a-z])/g, function ($1) {
        return $1.toUpperCase().replace(/[-_]/, '');
    });
};

var snakeKeys = {
    'image_types': ['jpg', 'jpeg', 'png', 'gif'],
        'requires_description': false,
        'the_number_one': 1,
        'the_string_image': 'image'
};

var camelCaseResult = {};

function test() {

    var keys = _.keys(snakeKeys);
    for (var i = 0; i < keys.length; i++) {
        camelCaseResult[keys[i].toCamel()] = snakeKeys[keys[i]];
    }
    return camelCaseResult;
    //alert(_.pairs(camelCaseResult));
}
$(document).ready(test);