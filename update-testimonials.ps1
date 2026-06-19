cd 'd:\kp enterprises'
foreach($file in Get-ChildItem 'src\locales\*.json') {
    Write-Host "Processing $($file.Name)..."
    $json = Get-Content $file.FullName -Raw | ConvertFrom-Json
    # Update testimonial locations to be only Chennai/Thiruvallur areas
    $json.testimonials.items[0].location = 'Chennai'
    $json.testimonials.items[1].location = 'Thiruvallur'
    $json.testimonials.items[2].location = 'Avadi'
    # Add new i18n keys for review form and booking status
    if (-not $json.reviewForm) {
        $json.reviewForm = @{
            title = "Leave a Review"
            name = "Your Name"
            namePlaceholder = "Enter your name"
            location = "Your Location"
            locationPlaceholder = "Enter your area"
            text = "Your Review"
            textPlaceholder = "Share your experience..."
            submit = "Submit Review"
            success = "Thank you for your review!"
            error = "Failed to submit review. Please try again."
        }
    }
    if (-not $json.bookingStatus) {
        $json.bookingStatus = @{
            title = "Check Booking Status"
            bookingId = "Booking ID"
            bookingIdPlaceholder = "Enter your booking ID"
            check = "Check Status"
            statuses = @{
                pending = "Pending"
                confirmed = "Confirmed"
                inProgress = "In Progress"
                completed = "Completed"
                cancelled = "Cancelled"
            }
            notFound = "Booking not found. Please check your ID."
        }
    }
    $json | ConvertTo-Json -Depth 10 | Set-Content $file.FullName
    Write-Host "Updated $($file.Name) successfully"
}