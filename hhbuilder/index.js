// Wrapper to send once document is loaded
function run() {
  // Hold current household state
  var household_array = [];

  function removePerson (index, array) {
    var result = array
    result.splice(index, 1);
    return result;
  }
  // Update View
  function updateHousehold (array) {
    var updatedHouse = array;
    var el = document.querySelector("ol.household");
    el.innerHTML = '';
    updatedHouse.forEach(function(item, index) {
      var household = document.getElementsByClassName("household");
      var li = document.createElement('li');
      li.setAttribute("key", index);
      var p = document.createElement('p');
      var relationship = item["relationship"];
      var age = item["age"];
      var smoker = item["smoker"];
      var button = document.createElement('button');
      var buttonText = document.createTextNode('Delete');
      button.appendChild(buttonText);
      button.addEventListener("click", function(e){
        e.preventDefault();
        household_array = removePerson(index, updatedHouse);
        updateHousehold(household_array);
      })
      button.style.color = 'red';
      var newContent = document.createTextNode('Age: ' + age + ' | Relationship: ' + relationship + ' | Smoker: ' + smoker + ' | ');
      p.appendChild(newContent);
      p.appendChild(button);
      li.appendChild(p);
      household[0].appendChild(li);
    })
  }

  function validateAgeRelation(){
    var result = false;
    var form = document.getElementsByTagName("form")
    var age = form[0][0].value;
    var relationship = form[0][1].value;
    if (age > 0 && (age !== '' && relationship !== '')){
      result = true;
    }
    return result;
  }

  function addPerson (array) {
    var newHousehold = array;
    var newPersonObject = {};
    var form = document.getElementsByTagName("form")
    newPersonObject.age = form[0][0].value;
    newPersonObject.relationship = form[0][1].value;
    newPersonObject.smoker = form[0][2].checked;
    newHousehold.push(newPersonObject);
    var ageEl = document.querySelector("input[name='age']");
    var smokeEl = document.querySelector("input[name='smoker']");
    var relEl = document.querySelector("select[name='rel']");
    ageEl.value = "";
    smokeEl.value = "no";
    smokeEl.checked = false;
    relEl.value = "";
    return newHousehold;
  }
  // Add click handler to Add button
  var addEl = document.querySelector("button.add");
  addEl.addEventListener("click", function(e) {
    e.preventDefault();
    // Validate Age and Relationship before adding to household
    if (validateAgeRelation()){
      household_array = addPerson(household_array);
      updateHousehold(household_array);
    } else {
      window.alert('You must enter age greater than zero and select a relationship')
    }
  })

  function submitHousehold (array) {
    var parsedHouse = JSON.stringify(array);
    var debugEl = document.querySelector("pre.debug");
    debugEl.innerHTML = '';
    debugEl.style['width'] = '500px';
    debugEl.style['white-space'] = 'pre-wrap';
    debugEl.style.display = 'inline-flex';
    var code = document.createElement('code');
    code.appendChild(document.createTextNode(parsedHouse));
    debugEl.appendChild(code);
    console.log("Value: ",debugEl.value);
  }
  // Add click handler to submit button
  var submitEl = document.querySelector("button[type='submit']");
  submitEl.addEventListener("click", function (e) {
    e.preventDefault();
    submitHousehold(household_array)
  });
}

// in case the document is already rendered
if (document.readyState!='loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
  if (document.readyState=='complete') run();
});
