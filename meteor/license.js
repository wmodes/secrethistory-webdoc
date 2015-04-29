/*
 
   Copyright (c) 2015 Wes Modes (http://modes.io)
   This content is released under the GNU General Public License, 
   version 3 (GPL-3.0). More info at 
   http://opensource.org/licenses/GPL-3.0
   TODO: Relase under MIT

   Dependencies and license information:
   
   jQuery JavaScript Library v1.11.2 - all around awesome indispensible Swiss 
       army knife for JavaScript + Web
       (c) 2005, 2014 jQuery Foundation, Inc. and other contributors 
       MIT License (http://jquery.org/license)
   Meteor v1.0.3.1 - a fullstack NodeJS framework. We used demeteorizer to allow it 
       to run outside of its meteor context and deploy to vanilla PAAS server
       (c) 2015 Meteor Group (http://meteor.com) MIT License
   Scrollmagic.js v1.3.0 - this is the latest scrollmagic packaged for meteor.
       I was unsuccessful installing ScrollMagic 2.0.0 as client/lib js files.
       Be aware that 2.0.0 has modified instantiation and updated features.
       It would be good to upgrade when possible.
       (c) 2015 Jan Paepke MIT License
   GreenSock Animation Platform v0.10.5 - used for animation and tweening
       (c) 2008-2014, GreenSock. All rights reserved. 
       License at http://www.greensock.com/terms_of_use.html "You may use the 
       code at no charge in commercial or non-commercial apps, web sites, games, 
       components, and other software as long as end users are not charged a fee
       of any kind to use your product or gain access to any part of it."
   BigVideo.js  - for background video. Loaded as client/libjs file, modified to 
       handle muliple instances. ScrollMagic is used to trigger video on and off
       as it gets within range of the viewport
       (c) 2012 John Polacek (https://github.com/dfcb/BigVideo.js) MIT License
   Video.js v4.10.2 - Video player used by BigVideo
       (c) 2014 Brightcove, Inc. Apache License, Version 2.0
       (https://github.com/videojs/video.js/blob/master/LICENSE)
   Howler.js 2.0.0 - for background audio player. Loaded as client/libjs file. The
       player is in an javascript only library so it is not visible. ScrollMagic is
       used to trigger audio according to design of chapter.
       (c) 2010-2014, John Dyer (http://j.hn) MIT License
   FitText.js 1.2 - expands text to fit container used for titles.
       (c) 2011, Dave Rupert (http://daverupert.com) 
       License: WTFPL http://sam.zoy.org/wtfpl/
   Bootstrap.js v3.1.0 - HTML, CSS, and JavaScript framework for developing responsive, 
       mobile web projects
       (c) 2011-2014 Twitter, Inc. MIT License 
       (https://github.com/twbs/bootstrap/blob/master/LICENSE) 
   Bootbox.js v4.3.0 - for interactive simple modals
       (C) 2011-2015 by Nick Payne <nick@kurai.co.uk> MIT License
       MIT License
   JSON Editor v0.5.12 - JSON Schema -> HTML Editor
       (c) 2014 Jeremy Dorn (https://github.com/jdorn/json-editor/) MIT License
   Mousewheel.js v3.0.6 - to allow trapping vertical mouse wheel movements
       (c) 2011 Brandon Aaron (http://brandonaaron.net) MIT License
   ffmpeg v2.5.4 - (masquerading on Ubuntu as libav-tools in the repoA complete, 
       cross-platform solution to record, convert and stream audio and video. 
       Installed with options --with-libvorbis --with-libvpx
       --with-theora --with-tools. We use this to compress video.
       (c) ffmper.org GNU Lesser General Public License version 2.1
   HandBrakeCLI - HandBrakeCLI is command-line driven interface to a collection 
       of built-in libraries which enables the decoding, encoding and conversion 
       of audio and video streams to MP4 (M4V) and MKV container formats with an 
       emphasis on H.264/MPEG-4 AVC encoding through x264
       GNU General Public v2 License with L)GPL or BSD licensed libraries
   ffmpegthumbnailer v2.0.9 - A lightweight video thumbnailer. Uses ffmpeg to generate 
       thumbnails from video easily
       (c) dirk.vdb@gmail.com GNU GPL v2 License
   ImageMagick vi6.9.0-9 - a software suite to create, edit, compose, or convert bitmap 
       images. We use this to compress and resize and compress our images
       (c) 1999-2015 ImageMagick Studio LLC (http://imagemagick.org) Apache 2.0 License

*/
