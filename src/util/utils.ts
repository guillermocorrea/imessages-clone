import * as timeago from 'timeago.js';

export function formatTimestamp(timestamp: any) {
  return timestamp ? timeago.format(new Date(timestamp?.toDate())) : '';
}
