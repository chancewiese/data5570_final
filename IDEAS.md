## Ideas and suggestions here



Priority:
`Google Maps/OpenStreetMap`: Show event locations on a map and have a direction notes box.
2. Improve homepage looks, maybe have a box with upcoming events on the homepage.



Other:
1. Make it so events can be 'sub-events' or children events of other ones. 
    We can limit it so each child can only have 1 parent event, 
    and if it's a parent event, it can't have a parent event itself
6. Custom registration forms (this might be a big one)
`Real-Time Updates`: Enable live updates for event availability using WebSockets or long polling, so users see changes instantly.
`Notifications`: Let users sign up for email or SMS reminders for upcoming events to keep them informed.
`Waitlist Management`: Add a feature for users to join a waitlist for fully booked events, so they can be notified if spots open up.
`Family Accounts`: Add family members to accounts. When accounts have no family members, prompt them to add family 
    members so we have names and birthdays, etc. When registering, have a pop-up for which members to add. 
    Might need to add a family member part to the auth context so we know if they have no family members. Could map list of family member objects on account. 
`Rearrange Gallery Photos`: Ability to rearrange gallery photos. I *Chance* have worked on this for hours and couldn't get it to work. So maybe later, but not a huge priority right now.



Added:
`Dark Mode`: Add a dark mode toggle for a more accessible and personalized user experience.
`Search and Filter`: Allow users to search for events by keywords or filter by category, date, or location for better usability.
`User Authentication`: Implement user roles like attendee, organizer, and admin to manage access and functionality securely.
        - `Admin Panel`: Build a dashboard for admins to manage events, registrations, and users efficiently.
        - (There's an admin toggle on the account page which makes more buttons visible, essentially turning the whole site into an admin version)
`Event Calendar View`: Add a calendar that shows events by date. Users can click on a date to see what events are scheduled that day, and filter based on registration status.
        - 4. Implement a calendar view/page of events.
`Social Sharing`: Include share buttons so users can promote events on their social media platforms.
        - 5. QR code for events/sharing pop-up from events page. 
3. Add the ability to add images or attachments to an event card or event page. Maybe a gallery