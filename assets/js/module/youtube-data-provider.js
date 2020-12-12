'use strict';

import axios from 'axios';

class YoutubeDataProvider {
  constructor() {
    this.options = {
      part: 'snippet',
      key: 'AIzaSyCJFhLpq6fjFz0_qv24ibbC-aV6Q_J3sTU',
      channelId: 'UCWihiQGtAhpC0ReaSHa2CcQ',
      order: 'date',
      maxResults: 5,
      pageToken: ''
    }

    this.beforeThumbNumber = null;
  }

  get(params) {

    if(params.playlistId === undefined || params.playlistId === '') {
      throw 'playlistId undefined or empty';
    }

    const options = $.extend(this.options, params);

    return axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=${options.part}&key=${options.key}&playlistId=${options.playlistId}&maxResults=${options.maxResults}&pageToken=${options.pageToken}`)
    .then((res) => {

      console.log(res);

      if(res.data.items.length > 0) {

        let data = {};
        data.nextPageToken = res.data.nextPageToken;
        data.items = [];

        data.items = res.data.items.map(el => {
          return {
            videoId: el.snippet.resourceId.videoId,
            title: el.snippet.title,
            description: el.snippet.description,
            publishedAt: el.contentDetails.videoPublishedAt,
            thumbnail: this.getThumbnail()
          }
        });

        return data;
      }

    });

  }

  search(params) {
    const options = $.extend(this.options, params);

    return axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=${options.part}&key=${options.key}&channelId=${options.channelId}&order=${options.order}&maxResults=${options.maxResults}&pageToken=${options.pageToken}&id=${options.id}`)
    .then((res) => {

      if(res.data.items.length > 0) {
        let datas = [];
        res.data.items.some(el => {

          // [NOTE] 왜인지 모르지만 items 마지막 데이터에 channel 정보가 들어있어 제외시켜준다. 옵션에서 아예 뺄 수 있는지 모르겠다.
          if(new RegExp('channel').test(el.id.kind)) {
            return false;
          }

          datas.push({
            videoId: el.id.videoId,
            title: el.snippet.title,
            description: el.snippet.description,
            publishedAt: el.snippet.publishedAt
          });

        });

        return datas;
      }

    });
  }

  getLive() {
    // 아래 샘플은 key, channelId 동일
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=${this.options.part}&channelId=${this.options.channelId}&eventType=live&type=video&key=${this.options.key}`)
    .then((res) => {
      if(res.data.items.length > 0) {
        return res.data.items[0].id.videoId;
      }

    });
  }

  getThumbnail() {
    // 랜덤한 썸네일 가져오기
    let rand = this.getNewRand(this.beforeThumbNumber);
    this.beforeThumbNumber = rand;
    return `/image/list/list-${rand}.jpg`;
  }

  getNewRand(before) {
    let rand = Math.floor(Math.random() * 5 + 1);
    if(rand === before) {
      rand = this.getNewRand(before);
    }
    return rand;
  }

}

export default YoutubeDataProvider;
