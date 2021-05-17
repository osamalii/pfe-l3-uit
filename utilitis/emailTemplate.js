const verifyEmailBuilder = (link) =>{
    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
        '\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta content="width=device-width, initial-scale=1" name="viewport">\n' +
        '    <meta name="x-apple-disable-message-reformatting">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '    <meta content="telephone=no" name="format-detection">\n' +
        '    <title></title>\n' +
        '    <!--[if (mso 16)]>\n' +
        '    <style type="text/css">\n' +
        '    a {text-decoration: none;}\n' +
        '    </style>\n' +
        '    <![endif]-->\n' +
        '    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->\n' +
        '    <!--[if gte mso 9]>\n' +
        '<xml>\n' +
        '    <o:OfficeDocumentSettings>\n' +
        '    <o:AllowPNG></o:AllowPNG>\n' +
        '    <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
        '    </o:OfficeDocumentSettings>\n' +
        '</xml>\n' +
        '<![endif]-->\n' +
        '    <!--[if !mso]><!-- -->\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">\n' +
        '    <!--<![endif]-->\n' +
        '</head>\n' +
        '\n' +
        '<body>\n' +
        '    <div class="es-wrapper-color">\n' +
        '        <!--[if gte mso 9]>\n' +
        '\t\t\t<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">\n' +
        '\t\t\t\t<v:fill type="tile" color="#ffffff"></v:fill>\n' +
        '\t\t\t</v:background>\n' +
        '\t\t<![endif]-->\n' +
        '        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">\n' +
        '            <tbody>\n' +
        '                <tr>\n' +
        '                    <td class="esd-email-paddings" valign="top">\n' +
        '                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">\n' +
        '                            <tbody>\n' +
        '                                <tr>\n' +
        '                                    <td class="esd-stripe" align="center">\n' +
        '                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
        '                                            <tbody>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p40t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="334499">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" class="rollover"><img src="https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png" alt style="display: block;" width="100" class="rollover-first">\n' +
        '                                                                                            <div style="mso-hide:all;"><img width="100" class="rollover-second" style="max-height: 0px; display: none;" src="https://demo.stripocdn.email/content/guids/b36aa602-b893-4c1f-b3cf-c03582b8948c/images/3001621000454312.jpg"></div>\n' +
        '                                                                                        </a></td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text">\n' +
        '                                                                                        <h2>Welcome to corona\'s vaccination&nbsp;</h2>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r" esd-links-underline="none">\n' +
        '                                                                                        <p style="line-height: 200%;">For extra security , we need to verify your email address . We\'ve sent a verification email to this email please check in .&nbsp;</p>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-button es-p10t es-p10b es-m-txt-l"><span class="es-button-border" style="border-radius: 23px; border-color: #999999; background: #ffffff;"><a href="'+ link +'" class="es-button es-button-1620994252534" target="_blank" style="font-family: &quot;courier new&quot;, courier, &quot;lucida sans typewriter&quot;, &quot;lucida typewriter&quot;, monospace; font-weight: normal; background: #ffffff; border-color: #ffffff; color: #cc0000; border-radius: 23px; border-width: 10px 30px;">Verify my email</a></span></td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                            </tbody>\n' +
        '                                        </table>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                            </tbody>\n' +
        '                        </table>\n' +
        '                        <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">\n' +
        '                            <tbody>\n' +
        '                                <tr>\n' +
        '                                    <td class="esd-stripe" align="center" esd-custom-block-id="334502">\n' +
        '                                        <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
        '                                            <tbody>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p20r es-p20l" align="left">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="left">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p20" align="left">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text">\n' +
        '                                                                                        <p style="line-height: 150%;">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" style="line-height: 150%;" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="line-height: 150%;">Unsubscribe</a></p>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                            </tbody>\n' +
        '                                        </table>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                            </tbody>\n' +
        '                        </table>\n' +
        '                    </td>\n' +
        '                </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</body>\n' +
        '\n' +
        '</html>'
}

const ResetEmailBuilder = (link) => {
    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
        '\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta content="width=device-width, initial-scale=1" name="viewport">\n' +
        '    <meta name="x-apple-disable-message-reformatting">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '    <meta content="telephone=no" name="format-detection">\n' +
        '    <title></title>\n' +
        '    <!--[if (mso 16)]>\n' +
        '    <style type="text/css">\n' +
        '    a {text-decoration: none;}\n' +
        '    </style>\n' +
        '    <![endif]-->\n' +
        '    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->\n' +
        '    <!--[if gte mso 9]>\n' +
        '<xml>\n' +
        '    <o:OfficeDocumentSettings>\n' +
        '    <o:AllowPNG></o:AllowPNG>\n' +
        '    <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
        '    </o:OfficeDocumentSettings>\n' +
        '</xml>\n' +
        '<![endif]-->\n' +
        '    <!--[if !mso]><!-- -->\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">\n' +
        '    <!--<![endif]-->\n' +
        '</head>\n' +
        '\n' +
        '<body>\n' +
        '    <div class="es-wrapper-color">\n' +
        '        <!--[if gte mso 9]>\n' +
        '\t\t\t<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">\n' +
        '\t\t\t\t<v:fill type="tile" color="#ffffff"></v:fill>\n' +
        '\t\t\t</v:background>\n' +
        '\t\t<![endif]-->\n' +
        '        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">\n' +
        '            <tbody>\n' +
        '                <tr>\n' +
        '                    <td class="esd-email-paddings" valign="top">\n' +
        '                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">\n' +
        '                            <tbody>\n' +
        '                                <tr>\n' +
        '                                    <td class="esd-stripe" align="center">\n' +
        '                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
        '                                            <tbody>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p40t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="334499">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" class="rollover"><img src="https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png" alt style="display: block;" width="100" class="rollover-first">\n' +
        '                                                                                            <div style="mso-hide:all;"><img width="100" class="rollover-second" style="max-height: 0px; display: none;" src="https://demo.stripocdn.email/content/guids/b36aa602-b893-4c1f-b3cf-c03582b8948c/images/3001621000454312.jpg" alt></div>\n' +
        '                                                                                        </a></td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text">\n' +
        '                                                                                        <h2>Welcome to corona\'s vaccination&nbsp;</h2>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0" esd-links-underline="none">\n' +
        '                                                                                        <p style="line-height: 200%; font-size: 22px;"><em><strong>FORGOT YOUR PASSWORD ?&nbsp;&nbsp;</strong></em><br><span style="font-family: \'courier new\', courier, \'lucida sans typewriter\', \'lucida typewriter\', monospace; font-size: 25px;">that\'s okay&nbsp; , click to button below to reset your password .</span><br><br></p>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-button es-p10t es-p10b es-m-txt-l"><span class="es-button-border" style="border-radius: 23px; border-color: #999999; background: #ffffff;"><a href="'+link+'" class="es-button es-button-1620994252534" target="_blank" style="font-family: &quot;courier new&quot;, courier, &quot;lucida sans typewriter&quot;, &quot;lucida typewriter&quot;, monospace; font-weight: normal; background: #ffffff; border-color: #ffffff; color: #cc0000; border-radius: 23px; border-width: 10px 30px;">Reset password </a></span></td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                            </tbody>\n' +
        '                                        </table>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                            </tbody>\n' +
        '                        </table>\n' +
        '                        <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">\n' +
        '                            <tbody>\n' +
        '                                <tr>\n' +
        '                                    <td class="esd-stripe" align="center" esd-custom-block-id="334502">\n' +
        '                                        <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
        '                                            <tbody>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p20r es-p20l" align="left">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="left">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b" style="font-size:0">\n' +
        '                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">\n' +
        '                                                                                            <tbody>\n' +
        '                                                                                                <tr>\n' +
        '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
        '                                                                                                </tr>\n' +
        '                                                                                            </tbody>\n' +
        '                                                                                        </table>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                                <tr>\n' +
        '                                                    <td class="esd-structure es-p20" align="left">\n' +
        '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                            <tbody>\n' +
        '                                                                <tr>\n' +
        '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
        '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
        '                                                                            <tbody>\n' +
        '                                                                                <tr>\n' +
        '                                                                                    <td align="center" class="esd-block-text">\n' +
        '                                                                                        <p style="line-height: 150%;">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" style="line-height: 150%;" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="line-height: 150%;">Unsubscribe</a></p>\n' +
        '                                                                                    </td>\n' +
        '                                                                                </tr>\n' +
        '                                                                            </tbody>\n' +
        '                                                                        </table>\n' +
        '                                                                    </td>\n' +
        '                                                                </tr>\n' +
        '                                                            </tbody>\n' +
        '                                                        </table>\n' +
        '                                                    </td>\n' +
        '                                                </tr>\n' +
        '                                            </tbody>\n' +
        '                                        </table>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                            </tbody>\n' +
        '                        </table>\n' +
        '                    </td>\n' +
        '                </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</body>\n' +
        '\n' +
        '</html>'
}

const completeRegistrationEmailBuilder = (link)=>{
  return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
      '\n' +
      '<head>\n' +
      '    <meta charset="UTF-8">\n' +
      '    <meta content="width=device-width, initial-scale=1" name="viewport">\n' +
      '    <meta name="x-apple-disable-message-reformatting">\n' +
      '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
      '    <meta content="telephone=no" name="format-detection">\n' +
      '    <title></title>\n' +
      '    <!--[if (mso 16)]>\n' +
      '    <style type="text/css">\n' +
      '    a {text-decoration: none;}\n' +
      '    </style>\n' +
      '    <![endif]-->\n' +
      '    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->\n' +
      '    <!--[if gte mso 9]>\n' +
      '<xml>\n' +
      '    <o:OfficeDocumentSettings>\n' +
      '    <o:AllowPNG></o:AllowPNG>\n' +
      '    <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
      '    </o:OfficeDocumentSettings>\n' +
      '</xml>\n' +
      '<![endif]-->\n' +
      '    <!--[if !mso]><!-- -->\n' +
      '    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">\n' +
      '    <!--<![endif]-->\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '    <div class="es-wrapper-color">\n' +
      '        <!--[if gte mso 9]>\n' +
      '\t\t\t<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">\n' +
      '\t\t\t\t<v:fill type="tile" color="#ffffff"></v:fill>\n' +
      '\t\t\t</v:background>\n' +
      '\t\t<![endif]-->\n' +
      '        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">\n' +
      '            <tbody>\n' +
      '                <tr>\n' +
      '                    <td class="esd-email-paddings" valign="top">\n' +
      '                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">\n' +
      '                            <tbody>\n' +
      '                                <tr>\n' +
      '                                    <td class="esd-stripe" align="center">\n' +
      '                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
      '                                            <tbody>\n' +
      '                                                <tr>\n' +
      '                                                    <td class="esd-structure es-p40t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="334499">\n' +
      '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                            <tbody>\n' +
      '                                                                <tr>\n' +
      '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
      '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                                            <tbody>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" class="rollover"><img src="https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png" alt style="display: block;" width="100" class="rollover-first">\n' +
      '                                                                                            <div style="mso-hide:all;"><img width="100" class="rollover-second" style="max-height: 0px; display: none;" src="https://demo.stripocdn.email/content/guids/b36aa602-b893-4c1f-b3cf-c03582b8948c/images/3001621000454312.jpg"></div>\n' +
      '                                                                                        </a></td>\n' +
      '                                                                                </tr>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-text">\n' +
      '                                                                                        <h2>Welcome to corona\'s vaccination&nbsp;</h2>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
      '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
      '                                                                                            <tbody>\n' +
      '                                                                                                <tr>\n' +
      '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
      '                                                                                                </tr>\n' +
      '                                                                                            </tbody>\n' +
      '                                                                                        </table>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r" esd-links-underline="none">\n' +
      '                                                                                        <p style="line-height: 200%;">Compelete your registration as a doctor, by filling this form.&nbsp;</p>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">\n' +
      '                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">\n' +
      '                                                                                            <tbody>\n' +
      '                                                                                                <tr>\n' +
      '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
      '                                                                                                </tr>\n' +
      '                                                                                            </tbody>\n' +
      '                                                                                        </table>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-button es-p10t es-p10b es-m-txt-l"><span class="es-button-border" style="border-radius: 23px; border-color: #999999; background: #ffffff;"><a href="'+ link +'" class="es-button es-button-1620994252534" target="_blank" style="font-family: &quot;courier new&quot;, courier, &quot;lucida sans typewriter&quot;, &quot;lucida typewriter&quot;, monospace; font-weight: normal; background: #ffffff; border-color: #ffffff; color: #cc0000; border-radius: 23px; border-width: 10px 30px;">Fill Form</a></span></td>\n' +
      '                                                                                </tr>\n' +
      '                                                                            </tbody>\n' +
      '                                                                        </table>\n' +
      '                                                                    </td>\n' +
      '                                                                </tr>\n' +
      '                                                            </tbody>\n' +
      '                                                        </table>\n' +
      '                                                    </td>\n' +
      '                                                </tr>\n' +
      '                                            </tbody>\n' +
      '                                        </table>\n' +
      '                                    </td>\n' +
      '                                </tr>\n' +
      '                            </tbody>\n' +
      '                        </table>\n' +
      '                        <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover" align="center">\n' +
      '                            <tbody>\n' +
      '                                <tr>\n' +
      '                                    <td class="esd-stripe" align="center" esd-custom-block-id="334502">\n' +
      '                                        <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="700">\n' +
      '                                            <tbody>\n' +
      '                                                <tr>\n' +
      '                                                    <td class="esd-structure es-p20r es-p20l" align="left">\n' +
      '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                            <tbody>\n' +
      '                                                                <tr>\n' +
      '                                                                    <td width="660" class="esd-container-frame" align="left">\n' +
      '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                                            <tbody>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b" style="font-size:0">\n' +
      '                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">\n' +
      '                                                                                            <tbody>\n' +
      '                                                                                                <tr>\n' +
      '                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>\n' +
      '                                                                                                </tr>\n' +
      '                                                                                            </tbody>\n' +
      '                                                                                        </table>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                            </tbody>\n' +
      '                                                                        </table>\n' +
      '                                                                    </td>\n' +
      '                                                                </tr>\n' +
      '                                                            </tbody>\n' +
      '                                                        </table>\n' +
      '                                                    </td>\n' +
      '                                                </tr>\n' +
      '                                                <tr>\n' +
      '                                                    <td class="esd-structure es-p20" align="left">\n' +
      '                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                            <tbody>\n' +
      '                                                                <tr>\n' +
      '                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">\n' +
      '                                                                        <table cellpadding="0" cellspacing="0" width="100%">\n' +
      '                                                                            <tbody>\n' +
      '                                                                                <tr>\n' +
      '                                                                                    <td align="center" class="esd-block-text">\n' +
      '                                                                                        <p style="line-height: 150%;">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><a target="_blank" style="line-height: 150%;" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="line-height: 150%;">Unsubscribe</a></p>\n' +
      '                                                                                    </td>\n' +
      '                                                                                </tr>\n' +
      '                                                                            </tbody>\n' +
      '                                                                        </table>\n' +
      '                                                                    </td>\n' +
      '                                                                </tr>\n' +
      '                                                            </tbody>\n' +
      '                                                        </table>\n' +
      '                                                    </td>\n' +
      '                                                </tr>\n' +
      '                                            </tbody>\n' +
      '                                        </table>\n' +
      '                                    </td>\n' +
      '                                </tr>\n' +
      '                            </tbody>\n' +
      '                        </table>\n' +
      '                    </td>\n' +
      '                </tr>\n' +
      '            </tbody>\n' +
      '        </table>\n' +
      '    </div>\n' +
      '</body>\n' +
      '\n' +
      '</html>'
}

module.exports = {verifyEmailBuilder,ResetEmailBuilder, completeRegistrationEmailBuilder};
