# Reuseable-LWC-Wizard-Using-Slot

![Screenshot from 2022-11-10 08-33-23](https://user-images.githubusercontent.com/22127564/201043606-056f8dac-cd79-4e77-99d5-7a30ced315b6.png)

# Overview
It’s a reusable LWC component wizard, which can hold any number of child LWC components irrespective of their design. 

- Each step is a child component.
- The number of steps will be identified dynamically based on the child component’s markups.
- On click of ‘Back’ and ‘Next’, components will be shown/hidden. 
- ‘Next’ and ‘Finish’ button will take care of validating the inner child components too.

# Technical Details

Attributes :- 

- Wizard 

      @api showfinishbutton : Set it to ‘true’ in order to render ‘finish’ button on the last frame. If not set, or kept ‘false’, ‘finish’ button will not appear.
      
      wizardfinish :- an event raised by wizard on click of ‘Finish’, which can be subscribed to perform an action, by the owner, once the wizard completes.

- Wizard Frame

      @api frame :- unique number defining the position of a wizard Frame component in wizard.

      @api name :- Name of the wizard Frame component, designs the name of that step. 

      @api beforenext (optional) :- Any Business logic that needs to be run for the current window, before the wizard moves to the next step, should be defined here as ‘,’ separated values. Also, all such methods need to be annotated with @api tag.

      @api beforeload (optional) :- Any Business logic that needs to be run on the current window, before the wizard loads it, should be defined here as ‘,’ separated values. 
      Also, all such methods need to be annotated with @api tag.


# How to Use?

ParentContainer.html 

    <template>
        <c-wizard onwizardfinish={handleThisEvent} showfinishbutton="true">
            <c-wizard-frame frame="1" name="Step 1" beforenext="validate" beforeload="loadData">
                <c-child-lwc-one></c-child-lwc-one>
            </c-wizard-frame>
            <c-wizard-frame frame="2" name="Step 2">
                <c-child-lwc-two></c-child-lwc-two>
            </c-wizard-frame>
        </c-wizard>
    </template>

childLwcOne.js 

    export default class ChildLwcOne extends LightningElement {

        @api validate() {
          //some business logic to validate
        return true;
      }

        @api loadData(){
      //some business logic to validate
        return true;
      }
    }


# References

- [Slot](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_components_slots)

- [Componenet Composition](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_best_composition)
