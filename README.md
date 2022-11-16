# Reuseable-LWC-Wizard-Using-Slot

![Screenshot from 2022-11-10 08-33-23](https://user-images.githubusercontent.com/22127564/201043606-056f8dac-cd79-4e77-99d5-7a30ced315b6.png)

# Structure and Code Flow

1. ***LWCWizard*** has a slot configured. Once all markups have been passed, onSlotChange will run and all Markups will be registered in Memory. 
2. ***childLwc*** is the sample child component, that registers itself to parent wizard.
3. ***Container*** is a sample LWC for testing the wizard and children.

LWCWizard Expects following attributes from each child
- frame : a unique number of Child Component
- name : name of Child component
- validate() : method defined in child component, in case some validation needs to be called by wizard on a perticular child component 
- handle onwizardfinish event : the parent container of wizard will handle this event. This event gets fired by wizard, once we reach last screen and click finish.

# References

- [Slot](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_components_slots)

- [Componenet Composition](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_best_composition)
