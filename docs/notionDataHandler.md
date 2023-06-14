# Notion Data Handler Factory Method

Here are all of the handlers I will need:

1. `CheckboxPropertyHandlerFactory`: Handles "`checkbox`" property type.
2. `CreatedByPropertyHandlerFactory`: Handles "`created_by`" property type.
3. `CreatedTimePropertyHandlerFactory`: Handles "`created_time`" property type.
4. `DatePropertyHandlerFactory`: Handles "`date`" property type.
5. `EmailPropertyHandlerFactory`: Handles "`email`" property type.
6. `UrlPropertyHandlerFactory`: Handles "`url`" property type.
7. `NumberPropertyHandlerFactory`: Handles "`number`" property type.
8. `PhoneNumberPropertyHandlerFactory`: Handles "`phone_number`" property type.
9. `SelectPropertyHandlerFactory`: Handles "`select`" property type.
10. `MultiSelectPropertyHandlerFactory`: Handles "`multi_select`" property type.
11. `PeoplePropertyHandlerFactory`: Handles "`people`" property type.
12. `LastEditedByPropertyHandlerFactory`: Handles "`last_edited_by`" property type.
13. `LastEditedTimePropertyHandlerFactory`: Handles "`last_edited_time`" property type.
14. `TitlePropertyHandlerFactory`: Handles "`title`" property type.
15. `RichTextPropertyHandlerFactory`: Handles "`rich_text`" property type.
16. `FilesPropertyHandlerFactory`: Handles "`files`" property type.
17. `FormulaPropertyHandlerFactory`: Handles "`formula`" property type.
18. `RollupPropertyHandlerFactory`: Handles "`rollup`" property type.
19. `RelationPropertyHandlerFactory`: Handles "`relation`" property type.
20. `StatusPropertyHandlerFactory`: Handles "`status`" property type.
21. `IdPropertyHandlerFactory`: Handles "`unique_id`" property type.

## CheckboxPropertyHandlerFactory

```ts
export class CheckboxPropertyHandlerFactory extends PropertyHandlerFactory {
  constructor() {
    super('checkbox');
  }

  public create(
    property: CheckboxProperty,
    data: CheckboxPropertyValue
  ): CheckboxPropertyHandler {
    return new CheckboxPropertyHandler(property, data);
  }
}
```