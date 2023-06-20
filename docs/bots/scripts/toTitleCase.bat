REM @echo off
REM setlocal enabledelayedexpansion
REM 
REM set counter=1
REM 
REM for %%F in (*.png) do (
REM     set "filename=%%~nF"
REM     
REM     REM Convert camel case to title case
REM     set "newname="
REM     for /F "delims=" %%C in ('echo !filename! ^| sed "s/\([a-z]\)\([A-Z]\)/\1 \2/g"') do set "newname=!newname! %%C"
REM     set "newname=!counter!.!newname!.png"
REM     
REM     REM Rename the file
REM     ren "%%F" "!newname!"
REM     
REM     set /A "counter+=1"
REM )
REM 
REM endlocal


mv AdminBot.png          "1. Admin Bot.png"
mv AggregatorBot.png     "2. Aggregator Bot.png"
mv ArcadeBot.png         "3. Arcade Bot.png"
mv BankingBot.png        "4. Banking Bot.png"
mv CheckoutBot.png       "5. Checkout Bot.png"
mv EmergencyBot.png      "6. Emergency Bot.png"
mv EvacuationBot.png     "7. Evacuation Bot.png"
mv EventsBot.png         "8. Events Bot.png"
mv FashionBot.png        "9. Fashion Bot.png"
mv FashionKidsBot.png    "10. Fashion Kids Bot.png"
mv FinderBot.png         "11. Finder Bot.png"
mv FoodCourtBot.png      "12. Food Court Bot.png"
mv FormalBot.png         "13. Formal Bot.png"
mv GadgetBot.png         "14. Gadget Bot.png"
mv GuideBot.png          "15. Guide Bot.png"
mv HelperBot.png         "16. Helper Bot.png"
mv IceRinkBot.png        "17. Ice Rink Bot.png"
mv MovieBot.png          "18. Movie Bot.png"
mv InfoBot.png           "19. Info Bot.png"
mv ManagementBot.png     "20. Management Bot.png"
mv TenantBot.png         "21. Tenant Bot.png"
mv ParkingBot.png        "22. Parking Bot.png"
mv SecurityBot.png       "23. Security Bot.png"
mv SportsBot.png         "24. Sports Bot.png"
mv MediaBot.png          "25. Media Bot.png"
mv LostaddFoundBot.png   "26. Lost add Found Bot.png"

