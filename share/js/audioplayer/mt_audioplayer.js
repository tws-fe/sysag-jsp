;(function( $, window, document, undefined ){
	
	var isTouch = 'ontouchstart' in window;
	var eStart = isTouch ? 'touchstart'	: 'mousedown';
	var eMove = isTouch ? 'touchmove'	: 'mousemove';
	var eEnd = isTouch ? 'touchend'	: 'mouseup';
	var eCancel	= isTouch ? 'touchcancel' : 'mouseup';
	
	var	secondsToTime = function( secs ){
		
		var hours = Math.floor( secs / 3600 );
		var minutes = Math.floor( secs % 3600 / 60 );
		var seconds = Math.ceil( secs % 3600 % 60 );
		
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	
	};
	
	var canPlayType	  = function( file ){
		
		var audioElement = document.createElement( 'audio' );
		
		return !!( audioElement.canPlayType && audioElement.canPlayType( 'audio/' + file.split( '.' ).pop().toLowerCase() + ';' ).replace( /no/, '' ) );
	};	
	
	var reloadAudioPlay=function(_audioId,_url){
		var _audio = document.getElementById(_audioId);
		_audio.src=_url;
		_audio.currentTime = 0;
		_audio.play();		
	}
	
	$.fn.audioPlayer = function(params){		
		
		var params=$.extend({ classPrefix: 'audioplayer', strPlay: '播放', strPause: '暂停', strVolume: '声音' },params);
		var	cssClass= {};
		var cssClassSub ={
							playPause:	 	'playpause',
							playing:		'playing',
							time:		 	'time',
							timeCurrent:	'time-current',
							timeDuration: 	'time-duration',
							bar: 			'bar',
							barLoaded:		'bar-loaded',
							barPlayed:		'bar-played',
							volume:		 	'volume',
							volumeButton: 	'volume-button',
							volumeAdjust: 	'volume-adjust',
							noVolume: 		'novolume',
							mute: 			'mute',
							mini: 			'mini'
						};
		
		for( var subName in cssClassSub ){
			cssClass[subName] =params.classPrefix + '-' + cssClassSub[ subName ];
		}
			
		this.each(function(){
			if( $( this ).prop( 'tagName' ).toLowerCase() != 'audio' ){
				return false;
			}
			
			var $this=$( this );
			
			var audioFile  = MATECH_SYSTEM_WEB_ROOT+'common.do?method=attachDownload&ptype=audio&attachId='+$this.attr( 'attachid' )+'&'+$this.attr( 'attachname' );
			
			var isAutoPlay = $this.get( 0 ).getAttribute( 'autoplay' );
			isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false;
			
			var isLoop = $this.get( 0 ).getAttribute( 'loop' );
			isLoop = isLoop === '' || isLoop	 === 'loop'		? true : false;
			
			var showDownload=$this.attr( 'showdownload' );
			var showRemove=$this.attr( 'showremove' );
			
			var isSupport  = false;
				
			if( typeof audioFile === 'undefined' ){
				$this.find( 'source' ).each( function(){
					audioFile = $(this).attr('src');
					if( typeof audioFile !== 'undefined' && canPlayType( audioFile ) ){
						isSupport = true;
						return false;
					}
				});
			}else if(canPlayType( audioFile)){
				isSupport = true;
			} 
			
			var _html='<div id="'+$this.attr( 'attachid' )+'" inputid="'+$this.attr('inputid')+'" class="' + params.classPrefix + '">';
			if(isSupport){
				_html+='<audio id="audioplay_'+$this.attr( 'attachid' )+'" src="'+audioFile+'" preload="auto" controls"></audio> ';
				//$( '<div>' ).append( $this.eq( 0 ).clone() ).html();
			}else{
				_html+='<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() +'" loop="' + isLoop.toString() + '" />';
			}
			_html+='<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><img src="'+CONTEXTPATH+'share/js/audioplayer/images/ks.png"/></div>';
			_html+='<div class="audioplayer-download" title="下载:'+$this.attr( 'attachname' )+'"><a href="' + CONTEXTPATH + '/common.do?method=attachDownload&attachId=' + $this.attr( 'attachid' ) + '"><img style="padding: 10px 20px;" src="'+CONTEXTPATH+'share/js/audioplayer/images/xz.png"></a></div>';
			_html+='<div class="audioplayer-del" title="删除"><img style="padding: 10px 20px;" src="'+CONTEXTPATH+'share/js/audioplayer/images/sc.png"></div>';
			_html+='</div>';
			
			var thePlayer = $(_html);
			var theAudio  = isSupport ? thePlayer.find( 'audio' ) : thePlayer.find( 'embed' );
			theAudio = theAudio.get( 0 );			
			theAudio.loop=false;
			
			if( isSupport ){
				thePlayer.find( 'audio' ).css( { 'width': 0, 'height': 0, 'visibility': 'hidden' } );
				
				_html='<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div>';
				_html+='<div class="' + cssClass.bar + '">';
				_html+='  <div class="' + cssClass.barLoaded + '"></div>';
				_html+='  <div class="' + cssClass.barPlayed + '"><img src="'+CONTEXTPATH+'share/js/audioplayer/images/bf4.png"/></div>';
				_html+='</div>';
				_html+='<div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div>';
				_html+='<div class="' + cssClass.volume + '">';
				_html+='  <div class="' + cssClass.volumeButton + '" title="' + params.strVolume + '"><img src="'+CONTEXTPATH+'share/js/audioplayer/images/bf.png"/></div>';
				_html+='  <div class="' + cssClass.volumeAdjust + '"><div><div></div></div></div>';
				_html+='</div>';
				
				thePlayer.append(_html);
				
				var theBar = thePlayer.find( '.' + cssClass.bar );
				var barPlayed = thePlayer.find( '.' + cssClass.barPlayed );
				var barLoaded = thePlayer.find( '.' + cssClass.barLoaded );
				var timeCurrent = thePlayer.find( '.' + cssClass.timeCurrent );
				var timeDuration = thePlayer.find( '.' + cssClass.timeDuration );
				var volumeButton = thePlayer.find( '.' + cssClass.volumeButton );
				var volumeAdjuster = thePlayer.find( '.' + cssClass.volumeAdjust + ' > div' );
				var	volumeDefault = 0;
				
				var adjustCurrentTime = function( e ){
					theRealEvent		 = isTouch ? e.originalEvent.touches[ 0 ] : e;
					theAudio.currentTime = Math.round( ( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width() );
				};
				
				var adjustVolume = function( e ){
					theRealEvent	= isTouch ? e.originalEvent.touches[ 0 ] : e;
					theAudio.volume = Math.abs( ( theRealEvent.pageY - ( volumeAdjuster.offset().top + volumeAdjuster.height() ) ) / volumeAdjuster.height() );
				};
				
				var	updateLoadBar = setInterval( function(){
					//to fix the javascript bug INDEX_SIZE_ERR.
					if(theAudio.buffered.length > 0){
						if(theAudio.duration > 0){
							barLoaded.width( ( theAudio.buffered.end( 0 ) / theAudio.duration ) * 100 + '%' );
						}
						if( theAudio.buffered.end( 0 ) >= theAudio.duration ){
							clearInterval( updateLoadBar );
						}
					}
				}, 100 );
				
				var volumeTestDefault = theAudio.volume;
				var volumeTestValue = theAudio.volume = 0.111;
				
				if( Math.round( theAudio.volume * 1000 ) / 1000 == volumeTestValue ){
					theAudio.volume = volumeTestDefault;	
				}else{
					thePlayer.addClass( cssClass.noVolume );
				} 

				timeDuration.html( '&hellip;' );
				timeCurrent.text( secondsToTime( 0 ) );
				
				theAudio.addEventListener( 'loadeddata', function(){
					timeDuration.text( secondsToTime( theAudio.duration ) );
					volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
					volumeDefault = theAudio.volume;
				});
				
				theAudio.addEventListener( 'timeupdate', function(){
					timeCurrent.text( secondsToTime( theAudio.currentTime ) );
					barPlayed.width( ( theAudio.currentTime / theAudio.duration ) * 100 + '%' );
				});
				
				theAudio.addEventListener( 'volumechange', function(){
					volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
					if( theAudio.volume > 0 && thePlayer.hasClass( cssClass.mute ) ) thePlayer.removeClass( cssClass.mute );
					if( theAudio.volume <= 0 && !thePlayer.hasClass( cssClass.mute ) ) thePlayer.addClass( cssClass.mute );
				});
				
				theAudio.addEventListener( 'ended', function(){
					thePlayer.removeClass( cssClass.playing );
				},false);
				
				theBar.on( eStart, function( e ){
					adjustCurrentTime( e );
					theBar.on( eMove, function( e ) { adjustCurrentTime( e ); } );
				});
				theBar.on( eCancel, function(){
					theBar.unbind( eMove );
				});
				

				volumeButton.on( 'click', function(){
					if( thePlayer.hasClass( cssClass.mute ) ){
						thePlayer.removeClass( cssClass.mute );
						theAudio.volume = volumeDefault;
						//有声音
						$(this).children().attr("src",CONTEXTPATH+"share/js/audioplayer/images/bf1.png");
					}else{
						thePlayer.addClass( cssClass.mute );
						volumeDefault = theAudio.volume;
						theAudio.volume = 0;
						//无声音
						$(this).children().attr("src",CONTEXTPATH+"share/js/audioplayer/images/bf.png");
					}
					return false;
				});				
				volumeAdjuster.on( eStart, function( e ){
					adjustVolume( e );
					volumeAdjuster.on( eMove, function( e ) { adjustVolume( e ); } );
				});
				volumeAdjuster.on( eCancel, function(){
					volumeAdjuster.unbind( eMove );
				});				
				
			}else{
				thePlayer.addClass( cssClass.mini );
			}
			
			if( isAutoPlay ){
				thePlayer.addClass( cssClass.playing );
			} 
			
			
			
			thePlayer.find( '.' + cssClass.playPause ).on( 'click', function(){
				if( thePlayer.hasClass(cssClass.playing )){
					$( this ).attr( 'title', params.strPlay ).find( 'a' ).html( params.strPlay );
					thePlayer.removeClass( cssClass.playing );
					isSupport ? theAudio.pause() : theAudio.Stop();
					//暂停
					$(this).children().attr("src",CONTEXTPATH+"share/js/audioplayer/images/ks.png");
				}else{
					$( this ).attr( 'title', params.strPause ).find( 'a' ).html( params.strPause );
					thePlayer.addClass( cssClass.playing );
					isSupport ? theAudio.play() : theAudio.Play();
					//正在播放
					$(this).children().attr("src",CONTEXTPATH+"share/js/audioplayer/images/ks1.png");
				}
				
				if((theAudio.duration-theAudio.currentTime)<1){
					
					$( this ).attr( 'title', params.strPause ).find( 'a' ).html( params.strPause );
					thePlayer.addClass( cssClass.playing );
					$(this).children().attr("src",CONTEXTPATH+"share/js/audioplayer/images/ks1.png");
					
					reloadAudioPlay($this.attr( 'id' ),audioFile);
				}
				
				return false;
			});
			
			if(showDownload=="false"){
				thePlayer.find( '.audioplayer-download').css("display","none");
			}else{
				thePlayer.find( '.audioplayer-download').css("display","block");
			}
			if(showRemove=="false"){
				thePlayer.find( '.audioplayer-del').css("display","none");
			}else{
				thePlayer.find( '.audioplayer-del').css("display","block");
			}
			
			thePlayer.find( '.audioplayer-del').on( 'click', function(){
				window.attachRemove($this.attr('attachid'),$this.attr('inputid'),'audio',$this.attr( 'attachname' ));
				return false;
			});
			
			
			$this.replaceWith( thePlayer );
			
		});
		
		
		return this;
	};
})( jQuery, window, document );