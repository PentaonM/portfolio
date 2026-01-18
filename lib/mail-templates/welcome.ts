export const welcomeTemplate = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            color: white;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .social-links a {
            color: #ffffff;
            text-decoration: none;
            margin: 0 8px;
            padding: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: inline-block;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        @media (max-width:660px) {
            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .image_block img.fullWidth {
                max-width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body style="margin: 0; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%); padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);">
        <tbody>
            <tr>
                <td>
                    <!-- Header Section -->
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <!-- Logo/Brand -->
                                                    <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center" style="line-height:10px">
                                                                    <div style="font-size: 32px; font-weight: 700; color: #ffffff; text-align: center;">
                                                                        Fentahun Modawo
                                                                    </div>
                                                                    <div style="font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 8px;">
                                                                        Full Stack Developer & Creative Designer
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Profile Image -->
                                                    <table class="image_block block-2" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center" style="line-height:10px">
                                                                    <img src="{{profileImageUrl}}" style="display: block; height: auto; border: 0; max-width: 200px; width: 100%; border-radius: 50%; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" width="200" alt="Fentahun Modawo" title="Fentahun Modawo" onerror="this.src='https://via.placeholder.com/200x200/667eea/ffffff?text=FM';">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Greeting -->
                                                    <table class="heading_block block-3" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                    {{greeting}}
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Main Content Section -->
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: rgba(255, 255, 255, 0.05);">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    
                                                    <!-- Title -->
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h2 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; font-weight: 600; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                    {{title}}
                                                                </h2>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Subtitle -->
                                                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                <div style="color:#ffffff;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:18px;line-height:140%;text-align:center;mso-line-height-alt:25.2px;">
                                                                    <p style="margin: 0; word-break: break-word; color: rgba(255,255,255,0.9);">
                                                                        {{subtitle}}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Message -->
                                                    <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:20px;">
                                                                <div style="color:#ffffff;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word; color: rgba(255,255,255,0.8);">
                                                                        {{message}}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- CTA Button -->
                                                    <table class="button_block block-4" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <a href="{{ctaUrl}}" target="_blank" class="btn-primary" style="text-decoration:none;display:inline-block;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:8px;width:auto;border-top:0px solid transparent;font-weight:600;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:12px;padding-bottom:12px;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;color: #ffffff;">
                                                                        <span style="padding-left:24px;padding-right:24px;font-size:16px;display:inline-block;letter-spacing:normal;">
                                                                            <span style="word-break: break-word; line-height: 32px;">{{cta}}</span>
                                                                        </span>
                                                                    </a>
                                                                    {{cvButton}}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Footer Section -->
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: rgba(255, 255, 255, 0.03);">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    
                                                    <!-- Footer Title -->
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; font-weight: 600; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                    {{footer.title}}
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Footer Subtitle -->
                                                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                <div style="color:#ffffff;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:16px;line-height:140%;text-align:center;mso-line-height-alt:22.4px;">
                                                                    <p style="margin: 0; word-break: break-word; color: rgba(255,255,255,0.8);">
                                                                        {{footer.subtitle}}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Social Links -->
                                                    <table class="social_block block-3" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="text-align:center;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center">
                                                                    <div style="margin-bottom: 20px; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500;">
                                                                        {{footer.social}}
                                                                    </div>
                                                                    <table class="social-table" width="200px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                        <tr>
                                                                            <td style="padding:0 8px 0 8px;">
                                                                                <a href="https://linkedin.com/in/fentahun-modawo-3a23a822b" target="_blank" style="color: #ffffff; text-decoration: none; padding: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: inline-block; transition: all 0.3s ease;">
                                                                                    LinkedIn
                                                                                </a>
                                                                            </td>
                                                                            <td style="padding:0 8px 0 8px;">
                                                                                <a href="https://github.com/ShadowCraftsmanCoder" target="_blank" style="color: #ffffff; text-decoration: none; padding: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: inline-block; transition: all 0.3s ease;">
                                                                                    GitHub
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Signature -->
                                                    <table class="paragraph_block block-4" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="color:#ffffff;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:16px;line-height:140%;text-align:center;mso-line-height-alt:22.4px;">
                                                                    <p style="margin: 0; word-break: break-word; color: rgba(255,255,255,0.9); font-weight: 600;">
                                                                        {{signature.name}}
                                                                    </p>
                                                                    <p style="margin: 8px 0 0 0; word-break: break-word; color: rgba(255,255,255,0.7); font-size: 14px;">
                                                                        {{signature.title}}
                                                                    </p>
                                                                    <p style="margin: 4px 0 0 0; word-break: break-word; color: rgba(255,255,255,0.6); font-size: 12px;">
                                                                        {{signature.location}}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Unsubscribe -->
                                                    <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="color:#ffffff;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:12px;line-height:140%;text-align:center;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word; color: rgba(255,255,255,0.5);">
                                                                        {{footer.unsubscribe}}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;
