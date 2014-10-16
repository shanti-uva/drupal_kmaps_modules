/**
 * Created by ys2n on 8/27/14.
 */

const SEARCH_MIN_LENGTH = 2;

(function ($) {

    AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
        init: function () {
            var self = this;
//            console.log("TEXTWIDGET: " + $(this.target))
//            console.dir($(this.target));

            $(this.target).on('keyup', function (e) {
//                console.log("keyup " + e);
                // alert("blurt");
                if (e.which == 13) {
                    var value = $(this).val();

                    if (value.length < SEARCH_MIN_LENGTH) {
                        if (self.notify) {
                            self.notify.clear();
                            self.notify.warn('warntooshort', 'Search string must be ' + SEARCH_MIN_LENGTH + ' characters or longer.');
                        }
                    } else {
                        if (self.notify) {
                            self.notify.clear();
                        }
                        //  If the user inserts wildcards, assume they know what they are doing.
                        if (value.indexOf('*') < 0) {

                            // Process advanced search

                            console.log("SEARCH GROUP:" + $('#searchAnchorGroup'));
                            console.log("SEARCH ANCHOR: " + $('#searchAnchorGroup input[checked]').val());
                            console.log("SEARCH SCOPE: " + $('#searchScopeGroup input[checked]').val());

                            var anchor = $('#searchAnchorGroup input[checked]').val();
                            var scope = $('#searchScopeGroup input[checked]').val();

                            switch (anchor) {
                                case 'startsWith':
                                    value = value + "*";
                                    break;
                                case 'contains':
                                    value = "*" + value + "*";
                                    break;
                                case 'exact':
                                    // fall through
                                    break;
                                default:
                                    alert("Error: unknown anchor: '" + anchor + "'")
                            }

                            switch (scope) {
                                case 'name':
//                                    console.log("name scope");
                                    self.manager.store.addByValue('df', 'name');
                                    break;
                                case 'all':
//                                    console.log('all scope');
                                    self.manager.store.addByValue('df', 'text');
                                    break;
                                default:
                                    alert("Error: unknown scope: '" + scope + "'");
                            }
                        }

                        // alert("search " + value);

//                        console.log("TEXTWIDGET: search " + value);


                        self.set(value);
                        if (value /* && self.set(value) */) {
//                            console.log("TEXTWIDGET: do Request " + value);
                            self.doRequest();
                        }

                    }
                }
            });

            $("button.searchreset").click( function() {
                    if (self.clear()) {
                        self.doRequest();  // OOPS!  DON'T do the request.
                    };
                    return true; // allow other listeners to fire?
                }
            );
        },

        beforeRequest: function() {
//            console.log("TextWidget: beforeRequest()");
        },

        afterRequest: function () {
//            console.log("TextWidget: afterRequest()");
            $(this.target).find('input').val('');
        }
    });

})(jQuery);






