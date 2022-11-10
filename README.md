# Reuseable-LWC-Wizard-Using-Slot

![Screenshot from 2022-11-10 08-33-23](https://user-images.githubusercontent.com/22127564/201043606-056f8dac-cd79-4e77-99d5-7a30ced315b6.png)

# Structure and Code Flow

1. ***LWCWizard*** has slots configured. Every Passing Markup has to raise an event to register itself in slot.
2. ***testChildLwc*** is the sample child component, which is raising the event in ***connectedCallback*** to register itself to parent wizard.
3. ***testLWC*** is a sample LWC for testing.

# References

- [Slot](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_components_slots)

- [Componenet Composition](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_best_composition)
