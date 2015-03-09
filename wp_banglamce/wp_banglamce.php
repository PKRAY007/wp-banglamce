<?php 
/*
Plugin Name: wp-banglamce
Plugin URI: N/A
Description: 
Author: lemon kazi
Version: 1.0

*/

/*  
    Copyright 2012  

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 1 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; 
*/
?>
<?php 

    
 //      if ( !defined('WP_CONTENT_URL') )   
 //          define( 'WP_CONTENT_URL', get_option('siteurl') . '/wp-content');  
 //      if ( !defined('WP_CONTENT_DIR') )
 //          define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );       
     	
 // $wpbanglamcefixed_path = WP_CONTENT_URL.'/plugins/'.plugin_basename(dirname(__FILE__)).'/';
 
 /*Note custom button add help is taken from wp codex *http://codex.wordpress.org/TinyMCE_Custom_Buttons
 */
 //apply_filters ( 'mce_buttons_3', array $buttons, string $editor_id )


//add_action('admin_head', 'gavickpro_add_my_tc_button');
//add_action('admin_head', 'banglamcefixed_addbuttons');

 function gavickpro_add_my_tc_button() {
    global $typenow;
    // check user permissions
    if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
    return;
    }
    // verify the post type
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return;
    // check if WYSIWYG is enabled
    if ( get_user_option('rich_editing') == 'true') {
        add_filter("mce_external_plugins", "gavickpro_add_tinymce_plugin");
        add_filter('mce_buttons', 'gavickpro_register_my_tc_button');
    }
}
function gavickpro_add_tinymce_plugin($plugin_array) {
    $plugin_array['gavickpro_tc_button'] = plugins_url( '/text-button.js', __FILE__ ); // CHANGE THE BUTTON SCRIPT HERE
    return $plugin_array;
}

function gavickpro_register_my_tc_button($buttons) {
   array_push($buttons, "gavickpro_tc_button");
   return $buttons;
}


 function banglamcefixed_addbuttons() {
   global $typenow;
    if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
     return;
   } 
   if( ! in_array( $typenow, array( 'post', 'page' ) ) ) {
        return;
      }
   if ( get_user_option('rich_editing') == 'true') {
     add_filter("mce_external_plugins", "add_banglamcefixed_tinymce_plugin");
     add_filter('mce_buttons', 'register_banglamcefixed_button');
   }
}
 add_filter( 'comment_form', 'wp_banglakb_comments' );
function wp_banglakb_comments(){
    $content = "
    <p class=\"comment-form-comment\">
	
	<input type='radio' name='wpbanglakbgrp'value='phonetic' onclick=\"banglakb_public_comment(phonetic);switched=false;\">ফোনেটিক</input>
    <input type='radio'name='wpbanglakbgrp' value='probhat' onclick=\"banglakb_public_comment(probhat);switched=false;\">  প্রভাত     </input>
	 <input type='radio'name='wpbanglakbgrp' value='english'  onclick='banglakb_toggle();'> english</input>
	
    </p>";
    echo $content;
}
add_action('init', 'wp_banglakb_loadjs');
function wp_banglakb_loadjs() {

    wp_enqueue_script('jquery');
    wp_enqueue_script('banglakb-engine', plugin_dir_url(__FILE__) . 'js/engine.js', array('jquery'));
   wp_enqueue_script('banglakb-driver-phonetic', plugin_dir_url(__FILE__) . 'js/driver.phonetic.js', array('jquery', 'banglakb-engine'));
    wp_enqueue_script('banglakb-driver-probhat', plugin_dir_url(__FILE__) . 'js/driver.probhat.js', array('jquery', 'banglakb-engine'));
	wp_enqueue_script('banglakb', plugin_dir_url(__FILE__) . 'js/banglakb.js', array('jquery', 'banglakb-engine'));
}
function register_bangla_avrofixed_button($buttons) {
   array_push($buttons, "separator", "banglafkb");
   return $buttons;
} 
 include WP_CONTENT_DIR . '/plugins/wp_banglamce/options_functions.php';
function register_banglamcefixed_button($buttons) {
   array_push($buttons, "banglafkb");
   return $buttons;
}


 function add_banglamcefixed_tinymce_plugin($plugin_array) {
  global $wpbanglamcefixed_path;	
   $plugin_array['banglafkb'] = plugins_url( '/banglafkb/editor-plugin.js', __FILE__ );
   //  $plugin_array['gavickpro_tc_button'] = plugins_url( '/text-button.js', __FILE__ ); // CHANGE THE BUTTON SCRIPT HERE
   return $plugin_array;
}


 function BanglaNumDate ($text) {
$text = str_replace('1', '১', $text);
$text = str_replace('2', '২', $text);
$text = str_replace('3', '৩', $text);
$text = str_replace('4', '৪', $text);
$text = str_replace('5', '৫', $text);
$text = str_replace('6', '৬', $text);
$text = str_replace('7', '৭', $text);
$text = str_replace('8', '৮', $text);
$text = str_replace('9', '৯', $text);
$text = str_replace('0', '০', $text); 
$text = str_replace('th', '-এ', $text); 
$text = str_replace('st', '-এ', $text);
$text = str_replace('rd', '-এ', $text);
$text = str_replace('th', '-এ', $text);
$text = str_replace('January', 'জানুয়ারী', $text);
$text = str_replace('February', 'ফেব্রুয়ারী', $text);
$text = str_replace('March', 'মার্চ', $text);
$text = str_replace('April', 'এপ্রিল', $text);
$text = str_replace('May', 'মে', $text);
$text = str_replace('June', 'জুন', $text);
$text = str_replace('July', 'জুলাই', $text);
$text = str_replace('August', 'অগাষ্ট', $text);
$text = str_replace('September', 'সেপ্টেম্বার', $text);
$text = str_replace('October', 'অক্টোবার', $text); 
$text = str_replace('November', 'নভেম্বার', $text); 
$text = str_replace('December', 'ডিসেম্বার', $text);
$text = str_replace('Jan', 'জানুয়ারী', $text);
$text = str_replace('Feb', 'ফেব্রুয়ারী', $text);
$text = str_replace('Mar', 'মার্চ', $text);
$text = str_replace('Apr', 'এপ্রিল', $text);
$text = str_replace('May', 'মে', $text);
$text = str_replace('Jun', 'জুন', $text);
$text = str_replace('Jul', 'জুলাই', $text);
$text = str_replace('Aug', 'অগাষ্ট', $text);
$text = str_replace('Sep', 'সেপ্টেম্বার', $text);
$text = str_replace('Oct', 'অক্টোবার', $text); 
$text = str_replace('Nov', 'নভেম্বার', $text); 
$text = str_replace('Dec', 'ডিসেম্বার', $text);
$text = str_replace('Saturday', 'শনিবার', $text);
$text = str_replace('Sunday', 'রবিবার', $text);
$text = str_replace('Monday', 'সোমবার', $text);
$text = str_replace('Tuesday', 'মঙ্গলবার', $text);
$text = str_replace('Wednesday', 'বুধবার', $text);
$text = str_replace('Thursday', 'বৃহস্পতিবার', $text);
$text = str_replace('Friday', 'শুক্রবার', $text);
$text = str_replace('Sat', 'শনি', $text);
$text = str_replace('Sun', 'রবি', $text);
$text = str_replace('Mon', 'সোম', $text);
$text = str_replace('Tue', 'মঙ্গল', $text);
$text = str_replace('Tues', 'মঙ্গল', $text);
$text = str_replace('Wed', 'বুধ', $text);
$text = str_replace('Thurs', 'বৃহস্পতি', $text);
$text = str_replace('Thu', 'বৃহস্পতি', $text);
$text = str_replace('Fri', 'শুক্র', $text);
return $text;
}
 
 
 
add_filter('the_date', 'BanglaNumDate');
add_filter('the_time', 'BanglaNumDate');
 
 add_filter( 'tiny_mce_before_init', 'myformatTinyMCE' );
function myformatTinyMCE( $in ) {

$in['wordpress_adv_hidden'] = FALSE;

return $in;
}
 
 
 
  add_action('admin_head', 'banglamcefixed_addbuttons');
 add_action('init', 'banglamcefixed_addbuttons');
add_action('comment_form','banglamcefixed_addbuttons')
?>