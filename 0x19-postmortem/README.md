
#Postmortem: WordPress Site Outage on August 18, 2024

## Issue Summary
- **Duration:** The outage lasted from 10:00 AM to 11:30 AM UTC on August 18, 2024.
- **Impact:** The WordPress site was down, affecting all users. Approximately 100% of the site's visitors encountered the `500 Internal Server Error`, rendering the site inaccessible.
- **Root Cause:** A typo in the PHP code, where the file extension was mistakenly written as `.phpp` instead of `.php`.

## Timeline
- **10:00 AM:** The issue was detected through a monitoring alert that indicated the site was returning a `500 Internal Server Error`.
- **10:05 AM:** An engineer checked the Apache error logs and confirmed the error.
- **10:10 AM:** The engineer used `strace` to trace system calls and identify the issue.
- **10:20 AM:** Initial investigation suggested a possible misconfiguration in the Apache or PHP setup.
- **10:30 AM:** After further investigation, it was discovered that the issue was due to a typo in the PHP file extension.
- **10:35 AM:** The incident was escalated to the development team for a fix.
- **11:00 AM:** The typo was corrected in the code.
- **11:10 AM:** The site was tested, and the issue was confirmed to be resolved.
- **11:30 AM:** The service was fully restored.

## Root Cause and Resolution
- **Root Cause:** The root cause of the outage was a simple typo in the PHP file extension within the WordPress configuration. The file was incorrectly named `wp-settings.phpp`, causing the server to fail when attempting to load the file, leading to a `500 Internal Server Error`.
- **Resolution:** The typo was corrected by renaming the file to `wp-settings.php`. After this correction, the Apache server was restarted, and the WordPress site returned to normal operation.

## Corrective and Preventative Measures
- **Improvements:**
- Implement code reviews to catch such typos before deployment.
- Increase automated testing coverage, including checks for common file extensions and configurations.
- Enhance monitoring to detect such issues more rapidly.

 - **Tasks:**
 - Patch the WordPress site to correct the typo.
 - Add a monitoring alert for missing or incorrectly named PHP files.
 - Conduct a training session on best practices for file naming and configuration management.
